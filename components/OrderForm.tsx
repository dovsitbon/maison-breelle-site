"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import site from "@/data/site.json";
import produits from "@/data/produits.json";
import { ORDER_EVENT, type OrderIntent } from "@/components/OrderLink";
import { CheckIcon, CloseIcon, PhoneIcon, PlusIcon, WhatsAppIcon } from "@/components/icons";
import { useLocale } from "@/components/providers";
import { fill, type Dict } from "@/lib/i18n";
import { formatDay, formatTime } from "@/lib/format";
import { addDays, pickupTimes } from "@/lib/hours";
import { CUTS, earliestPickup, emptyLine, isEmail, isPhone, orderText, unitOf, waLink, type Order, type OrderLine, type Unit } from "@/lib/order";

type Errors = Partial<Record<"lines" | "date" | "time" | "name" | "phone" | "email" | "send", string>>;
type Sent = { notified: boolean; confirmed: boolean; text: string; email: string };

const STEP = site.order.slotMinutes;

export function OrderForm() {
  const { lang, d } = useLocale();
  const t = d.order;
  const [lines, setLines] = useState<OrderLine[]>([emptyLine()]);
  const touched = useRef(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<Sent | null>(null);
  const [now, setNow] = useState<Date | null>(null);

  // Jours de retrait : seulement les jours d'ouverture, après le délai de commande (heure de Paris)
  const first = useMemo(() => (now ? earliestPickup(now) : null), [now]);
  const days = useMemo(() => {
    if (!first) return [];
    return Array.from({ length: 45 }, (_, i) => addDays(first.day, i))
      .filter((day) => pickupTimes(day, STEP, day === first.day ? first.notBefore : "00:00").length)
      .slice(0, 24);
  }, [first]);
  const times = date && first ? pickupTimes(date, STEP, date === first.day ? first.notBefore : "00:00") : [];

  useEffect(() => {
    setNow(new Date());
    const apply = (intent: OrderIntent) => {
      const line = emptyLine(intent.product, intent.detail ?? "");
      const keep = touched.current;
      touched.current = true;
      setLines((ls) => (keep ? [...ls, line] : [line]));
    };
    try {
      const saved = sessionStorage.getItem(ORDER_EVENT);
      if (saved) {
        sessionStorage.removeItem(ORDER_EVENT);
        apply(JSON.parse(saved) as OrderIntent);
      }
    } catch {}
    const onIntent = (e: Event) => apply((e as CustomEvent<OrderIntent>).detail);
    window.addEventListener(ORDER_EVENT, onIntent);
    return () => window.removeEventListener(ORDER_EVENT, onIntent);
  }, []);

  const update = (i: number, patch: Partial<OrderLine>) => {
    touched.current = true;
    setLines((ls) => ls.map((l, j) => (j === i ? { ...l, ...patch } : l)));
  };
  const changeProduct = (i: number, product: string) => update(i, { product, unit: unitOf(product), qty: 1, cut: "asIs" });

  function validate(): Errors {
    const e: Errors = {};
    if (!lines.length || lines.some((l) => !(l.qty > 0) || ((l.product === "other" || l.cut === "other") && !l.detail.trim()))) e.lines = t.errors.lines;
    if (!date) e.date = t.errors.date;
    if (!time) e.time = t.errors.time;
    if (!name.trim()) e.name = t.errors.name;
    if (!isPhone(phone)) e.phone = t.errors.phone;
    if (email.trim() && !isEmail(email)) e.email = t.errors.email;
    return e;
  }

  async function submit(ev: FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      document.querySelector<HTMLElement>(`[data-err="${Object.keys(e)[0]}"]`)?.focus();
      return;
    }
    const order: Order = { lines, date, time, name: name.trim(), phone: phone.trim(), email: email.trim(), message: message.trim() };
    setSending(true);
    try {
      const res = await fetch("/api/order", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ lang, order }) });
      const json = (await res.json()) as { ok: boolean; notified?: boolean; confirmed?: boolean };
      if (!res.ok || !json.ok) throw new Error("send");
      setSent({ notified: !!json.notified, confirmed: !!json.confirmed, text: orderText(order, lang, d), email: order.email });
      document.getElementById("commander")?.scrollIntoView({ block: "start" });
    } catch {
      setErrors({ send: t.errors.send });
    } finally {
      setSending(false);
    }
  }

  const call = (
    <a href={`tel:${site.phoneIntl}`} className="btn-line">
      <PhoneIcon />
      <span>
        {d.nav.call} · <span dir="ltr">{site.phone}</span>
      </span>
    </a>
  );

  if (sent) {
    const wa = waLink(sent.text);
    return (
      <div className="fade-in border border-line bg-white p-6 md:p-10" role="status">
        {sent.notified ? <CheckIcon className="h-8 w-8 text-green" /> : <PhoneIcon className="h-8 w-8 text-bordeaux" />}
        <h3 className="display mt-4 text-[2rem]">{sent.notified ? t.done.title : t.done.pendingTitle}</h3>
        <p className="lead mt-3">{sent.notified ? t.done.text : t.done.pendingText}</p>
        {sent.confirmed && <p className="mt-3 text-muted">{fill(t.done.mail, { email: sent.email })}</p>}
        <pre className="mt-6 border-s-2 border-bordeaux ps-4 font-[family-name:var(--font-body)] text-[0.9375rem] leading-relaxed whitespace-pre-wrap text-ink">{sent.text}</pre>
        <div className="mt-8 flex flex-wrap gap-3">
          {call}
          {wa && (
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-line">
              <WhatsAppIcon className="h-5 w-5" />
              {t.whatsapp}
            </a>
          )}
          <button
            type="button"
            className="link-line ms-2 self-center text-[0.9375rem] text-muted"
            onClick={() => {
              setSent(null);
              setLines([emptyLine()]);
              touched.current = false;
              setDate("");
              setTime("");
              setMessage("");
            }}
          >
            {t.done.again}
          </button>
        </div>
      </div>
    );
  }

  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`err-${k}`} className="mt-2 text-[0.9375rem] font-medium text-bordeaux">
        {errors[k]}
      </p>
    ) : null;
  const aria = (k: keyof Errors) => ({ "aria-invalid": errors[k] ? true : undefined, "aria-describedby": errors[k] ? `err-${k}` : undefined, "data-err": k });
  const legend = (n: number, text: string) => (
    <legend className="display mb-5 flex items-center gap-3 text-[1.6rem]">
      <span className="flex h-9 w-9 items-center justify-center bg-bordeaux font-[family-name:var(--font-display)] text-[1.1rem] text-cream">{n}</span>
      {text}
    </legend>
  );

  return (
    <form onSubmit={submit} noValidate className="space-y-12">
      {/* 1. Produits */}
      <fieldset>
        {legend(1, t.productsTitle)}
        <ul className="space-y-3">
          {lines.map((l, i) => (
            <li key={i} className="relative border border-line bg-white p-4 md:p-5">
              <div className="grid gap-x-4 gap-y-4 sm:grid-cols-[1.6fr_0.7fr_0.7fr]">
                <label className="block">
                  <span className="label">{t.product}</span>
                  <select className="field" value={l.product} onChange={(e) => changeProduct(i, e.target.value)} {...(i === 0 ? aria("lines") : {})}>
                    {produits.categories.map((c) => (
                      <optgroup key={c.id} label={d.categories[c.id as keyof Dict["categories"]]}>
                        {c.items.map((id) => (
                          <option key={id} value={id}>
                            {d.products[id as keyof Dict["products"]].name}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                    <option value="platDuJour">{t.dishOption}</option>
                    <option value="other">{t.other}</option>
                  </select>
                </label>
                <label className="block">
                  <span className="label">{t.quantity}</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    min={l.unit === "kg" ? 0.25 : 1}
                    step={l.unit === "kg" ? 0.25 : 1}
                    max={site.order.maxPerLine}
                    className="field tabular-nums"
                    value={l.qty}
                    onChange={(e) => update(i, { qty: Math.min(site.order.maxPerLine, Math.max(0, Number(e.target.value) || 0)) })}
                  />
                </label>
                <label className="block">
                  <span className="label">{t.unit}</span>
                  <select className="field" value={l.unit} onChange={(e) => update(i, { unit: e.target.value as Unit, qty: e.target.value === "piece" ? Math.max(1, Math.round(l.qty)) : l.qty })}>
                    <option value="kg">{t.units.kg}</option>
                    <option value="piece">{t.units.pieces}</option>
                  </select>
                </label>
              </div>
              <div className="mt-4 grid gap-x-4 gap-y-4 sm:grid-cols-[1fr_1.3fr]">
                <label className="block">
                  <span className="label">{t.cut}</span>
                  <select className="field" value={l.cut} onChange={(e) => update(i, { cut: e.target.value })}>
                    {CUTS.map((c) => (
                      <option key={c} value={c}>
                        {t.cuts[c as keyof Dict["order"]["cuts"]]}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="label">{l.product === "other" ? t.other : t.detail}</span>
                  <input className="field" value={l.detail} maxLength={400} placeholder={l.product === "other" ? t.otherPh : t.detailPh} onChange={(e) => update(i, { detail: e.target.value })} />
                </label>
              </div>
              {lines.length > 1 && (
                <button type="button" onClick={() => setLines((ls) => ls.filter((_, j) => j !== i))} className="absolute end-1 top-1 flex h-10 w-10 items-center justify-center text-muted hover:text-ink" aria-label={t.removeLine}>
                  <CloseIcon className="h-4 w-4" />
                </button>
              )}
            </li>
          ))}
        </ul>
        {lines.length < 15 && (
          <button
            type="button"
            onClick={() => {
              touched.current = true;
              setLines((ls) => [...ls, emptyLine()]);
            }}
            className="mt-4 inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-medium text-bordeaux"
          >
            <PlusIcon />
            <span className="link-line">{t.addLine}</span>
          </button>
        )}
        {err("lines")}
      </fieldset>

      {/* 2. Retrait */}
      <fieldset>
        {legend(2, t.pickupTitle)}
        <p className="-mt-2 mb-5 text-[0.9375rem] text-muted">{fill(t.pickupLead, { hours: site.order.leadHours })}</p>
        <div className="grid gap-x-4 gap-y-4 sm:grid-cols-2">
          <label className="block">
            <span className="label">
              {t.date} <span className="sr-only">({t.required})</span>
            </span>
            <select
              className="field"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setTime("");
              }}
              required
              {...aria("date")}
            >
              <option value="">—</option>
              {days.map((day) => (
                <option key={day} value={day}>
                  {formatDay(day, lang)}
                </option>
              ))}
            </select>
            {err("date")}
          </label>
          <label className="block">
            <span className="label">
              {t.time} <span className="sr-only">({t.required})</span>
            </span>
            <select className="field tabular-nums" value={time} onChange={(e) => setTime(e.target.value)} disabled={!date} required {...aria("time")}>
              <option value="">{t.timePh}</option>
              {times.map((h) => (
                <option key={h} value={h}>
                  {formatTime(h, lang)}
                </option>
              ))}
            </select>
            {err("time")}
          </label>
        </div>
      </fieldset>

      {/* 3. Coordonnées */}
      <fieldset>
        {legend(3, t.contactTitle)}
        <div className="grid gap-x-4 gap-y-4 sm:grid-cols-2">
          <label className="block">
            <span className="label">{t.name}</span>
            <input className="field" name="name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} required {...aria("name")} />
            {err("name")}
          </label>
          <label className="block">
            <span className="label">{t.phone}</span>
            <input className="field" name="tel" type="tel" inputMode="tel" autoComplete="tel" dir="ltr" value={phone} onChange={(e) => setPhone(e.target.value)} required {...aria("phone")} />
            {err("phone")}
          </label>
          <label className="block sm:col-span-2">
            <span className="label">{t.email}</span>
            <input className="field" name="email" type="email" spellCheck={false} inputMode="email" autoComplete="email" dir="ltr" value={email} onChange={(e) => setEmail(e.target.value)} {...aria("email")} />
            <span className="mt-1.5 block text-[0.875rem] text-muted">{t.emailHint}</span>
            {err("email")}
          </label>
          <label className="block sm:col-span-2">
            <span className="label">{t.message}</span>
            <textarea name="message" className="field min-h-24 resize-y" maxLength={1500} placeholder={t.messagePh} value={message} onChange={(e) => setMessage(e.target.value)} />
          </label>
        </div>
      </fieldset>

      <div>
        <button type="submit" className="btn w-full sm:w-auto sm:min-w-72" disabled={sending}>
          {sending ? t.sending : t.submit}
        </button>
        <p className="mt-4 text-[0.875rem] text-muted">{t.payNote}</p>
        {errors.send && (
          <div className="mt-5 space-y-4" role="alert">
            <p className="font-medium text-bordeaux">{errors.send}</p>
            {call}
          </div>
        )}
      </div>
    </form>
  );
}
