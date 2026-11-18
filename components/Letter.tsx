'use client';

import { useState } from 'react';
import { ArrowRight } from './icons';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function Letter() {
  const [status, setStatus] = useState<Status>('idle');

  const send = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus('sending');
    try {
      const res = await fetch('https://formsubmit.co/ajax/berniceboateng775@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...data, _subject: 'A letter from your portfolio' }),
      });
      const result = await res.json();
      if (res.ok && String(result.success) === 'true') {
        setStatus('sent');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <form className="letter" onSubmit={send}>
      <div className="field">
        <label htmlFor="name">Your name</label>
        <input id="name" name="name" autoComplete="name" required placeholder="Who is writing" />
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" autoComplete="email" required placeholder="Where I can reply" />
      </div>
      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" required placeholder="A role, a project, a question" />
      </div>
      <div className="letter-foot">
        <button type="submit" className="btn" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending' : 'Send letter'} <ArrowRight />
        </button>
        <p className={`letter-status${status === 'error' ? ' err' : ''}`} role="status">
          {status === 'sent' && 'Received. I’ll write back soon.'}
          {status === 'error' && 'That didn’t send. Email me directly instead.'}
        </p>
      </div>
    </form>
  );
}
