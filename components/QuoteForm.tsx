"use client";

import { useEffect, useState, type FormEvent } from "react";
import site from "@/data/site.json";
import { CheckIcon, PhoneIcon } from "@/components/icons";
import { useLocale } from "@/components/providers";
import { fill, type Dict } from "@/lib/i18n";
import { addDays } from "@/lib/hours";
import { isoDay } from "@/lib/format";
import { BUDGETS, EVENTS, FORMULAS, MODES, firstEventDay, quoteText, type Quote } from "@/lib/quote";
import { isEmail, isPhone } from "@/lib/order";

type Errors = Partial<Record<"event" | "date" | "guests" | "name" | "phone" | "email" | "send", string>>;
type Sent = { notified: boolean; confirmed: boolean; text: string; email: string };

/** Demande de devis traiteur : événement, date, personnes, formule, budget, retrait ou livraison, coordonnées. */
export function QuoteForm() {
  const { lang, d } = useLocale();
  const t = d.quote;
  const [q, setQ] = useState<Quote>({ event: "", date: "", guests: 0, formula: "unsure", budget: "unsure", mode: "pickup", address: "", name: "", phone: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<Sent | null>(null);
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(isoDay(new Date()));
    // Formule choisie depuis une carte (?formule=buffet) : préremplit formule et type d'événement
    const f = new URLSearchParams(window.location.search).get("formule");
    if (f && FORMULAS.includes(f)) setQ((x) => ({ ...x, formula: f, event: EVENTS.includes(f) ? f : x.event }));
  }, []);

  const set = <K extends keyof Quote>(k: K, v: Quote[K]) => setQ((x) => ({ ...x, [k]: v }));
  const soon = today && q.date && q.date < firstEventDay(new Date());

  function validate(): Errors {
    const e: Errors = {};
    if (!q.event) e.event = t.errors.event;
    if (!q.date || q.date < today) e.date = t.errors.date;
    if (!(q.guests >= 1)) e.guests = t.errors.guests;
    if (!q.name.trim()) e.name = t.errors.name;
    if (!isPhone(q.phone)) e.phone = t.errors.phone;
    if (!isEmail(q.email)) e.email = t.errors.email;
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
    const quote: Quote = { ...q, name: q.name.trim(), phone: q.phone.trim(), email: q.email.trim(), message: q.message.trim(), address: q.mode === "delivery" ? q.address.trim() : "" };
    setSending(true);
    try {
      const res = await fetch("/api/devis", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ lang, quote }) });
      const json = (await res.json()) as { ok: boolean; notified?: boolean; confirmed?: boolean };
      if (!res.ok || !json.ok) throw new Error("send");
      setSent({ notified: !!json.notified, confirmed: !!json.confirmed, text: quoteText(quote, lang, d), email: quote.email });
      document.getElementById("devis")?.scrollIntoView({ block: "start" });
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
        {d.nav.call} · {site.phone}
      </span>
    </a>
  );

  if (sent)
    return (
      <div className="fade-in border border-line bg-white p-6 md:p-10" role="status">
        {sent.notified ? <CheckIcon className="h-8 w-8 text-green" /> : <PhoneIcon className="h-8 w-8 text-bordeaux" />}
        <h3 className="display mt-4 text-[2rem]">{sent.notified ? t.done.title : t.done.pendingTitle}</h3>
        <p className="lead mt-3">{sent.notified ? t.done.text : t.done.pendingText}</p>
        {sent.confirmed && <p className="mt-3 text-muted">{fill(t.done.mail, { email: sent.email })}</p>}
        <pre className="mt-6 border-s-2 border-gold ps-4 font-[family-name:var(--font-body)] text-[0.9375rem] leading-relaxed whitespace-pre-wrap text-ink">{sent.text}</pre>
        <div className="mt-8 flex flex-wrap gap-3">
          {call}
          <button type="button" className="link-line ms-2 self-center text-[0.9375rem] text-muted" onClick={() => setSent(null)}>
            {t.done.again}
          </button>
        </div>
      </div>
    );

  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`qerr-${k}`} className="mt-2 text-[0.9375rem] font-medium text-bordeaux">
        {errors[k]}
      </p>
    ) : null;
  const aria = (k: keyof Errors) => ({ "aria-invalid": errors[k] ? true : undefined, "aria-describedby": errors[k] ? `qerr-${k}` : undefined, "data-err": k });
  const legend = (n: number, text: string) => (
    <legend className="display mb-5 flex items-center gap-3 text-[1.6rem]">
      <span className="flex h-9 w-9 items-center justify-center bg-bordeaux font-[family-name:var(--font-display)] text-[1.1rem] text-cream">{n}</span>
      {text}
    </legend>
  );

  return (
    <form onSubmit={submit} noValidate className="space-y-12">
      <fieldset>
        {legend(1, t.eventTitle)}
        <div className="grid gap-x-4 gap-y-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <span className="label" id="q-event">
              {t.event}
            </span>
            <div role="radiogroup" aria-labelledby="q-event" className="flex flex-wrap gap-2">
              {EVENTS.map((ev, i) => (
                <label key={ev} className="chip">
                  <input type="radio" name="event" value={ev} checked={q.event === ev} onChange={() => set("event", ev)} className="sr-only" {...(i === 0 ? aria("event") : {})} />
                  {t.events[ev as keyof Dict["quote"]["events"]]}
                </label>
              ))}
            </div>
            {err("event")}
          </div>
          <label className="block">
            <span className="label">{t.date}</span>
            <input type="date" className="field" min={today || undefined} max={today ? addDays(today, 730) : undefined} value={q.date} onChange={(e) => set("date", e.target.value)} required {...aria("date")} />
            {err("date")}
            {soon && <span className="mt-2 block text-[0.875rem] text-bordeaux">{fill(t.soon, { days: site.quote.minDays })}</span>}
          </label>
          <label className="block">
            <span className="label">{t.guests}</span>
            <input type="number" inputMode="numeric" min={1} max={2000} className="field tabular-nums" value={q.guests || ""} onChange={(e) => set("guests", Math.max(0, Math.round(Number(e.target.value) || 0)))} required {...aria("guests")} />
            {err("guests")}
          </label>
          <label className="block">
            <span className="label">{t.formula}</span>
            <select className="field" value={q.formula} onChange={(e) => set("formula", e.target.value)}>
              {FORMULAS.map((f) => (
                <option key={f} value={f}>
                  {f === "unsure" ? t.unsure : d.catering.items[f as keyof Dict["catering"]["items"]].name}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="label">{t.budget}</span>
            <select className="field" value={q.budget} onChange={(e) => set("budget", e.target.value)}>
              {BUDGETS.map((b) => (
                <option key={b} value={b}>
                  {t.budgets[b as keyof Dict["quote"]["budgets"]]}
                </option>
              ))}
            </select>
          </label>
          <div className="sm:col-span-2">
            <span className="label" id="q-mode">
              {t.mode}
            </span>
            <div role="radiogroup" aria-labelledby="q-mode" className="flex flex-wrap gap-2">
              {MODES.map((m) => (
                <label key={m} className="chip">
                  <input type="radio" name="mode" value={m} checked={q.mode === m} onChange={() => set("mode", m)} className="sr-only" />
                  {t.modes[m]}
                </label>
              ))}
            </div>
          </div>
          {q.mode === "delivery" && (
            <label className="block sm:col-span-2">
              <span className="label">{t.address}</span>
              <input className="field" autoComplete="street-address" placeholder={t.addressPh} value={q.address} maxLength={300} onChange={(e) => set("address", e.target.value)} />
            </label>
          )}
        </div>
      </fieldset>

      <fieldset>
        {legend(2, t.contactTitle)}
        <div className="grid gap-x-4 gap-y-4 sm:grid-cols-2">
          <label className="block">
            <span className="label">{t.name}</span>
            <input className="field" name="name" autoComplete="name" value={q.name} onChange={(e) => set("name", e.target.value)} required {...aria("name")} />
            {err("name")}
          </label>
          <label className="block">
            <span className="label">{t.phone}</span>
            <input className="field" name="tel" type="tel" inputMode="tel" autoComplete="tel" value={q.phone} onChange={(e) => set("phone", e.target.value)} required {...aria("phone")} />
            {err("phone")}
          </label>
          <label className="block sm:col-span-2">
            <span className="label">{t.email}</span>
            <input className="field" name="email" type="email" spellCheck={false} inputMode="email" autoComplete="email" value={q.email} onChange={(e) => set("email", e.target.value)} required {...aria("email")} />
            {err("email")}
          </label>
          <label className="block sm:col-span-2">
            <span className="label">{t.message}</span>
            <textarea name="message" className="field min-h-28 resize-y" maxLength={2000} placeholder={t.messagePh} value={q.message} onChange={(e) => set("message", e.target.value)} />
          </label>
        </div>
      </fieldset>

      <div>
        <button type="submit" className="btn w-full sm:w-auto sm:min-w-72" disabled={sending}>
          {sending ? t.sending : t.submit}
        </button>
        <p className="mt-4 text-[0.875rem] text-muted">{t.note}</p>
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
