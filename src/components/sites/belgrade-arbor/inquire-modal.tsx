"use client";

import { useState } from "react";

interface InquireModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialUnit?: string;
}

export function InquireModal({
  isOpen,
  onClose,
  initialUnit = "General Inquiry",
}: InquireModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: initialUnit,
    message: "",
  });
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#1F261E] border border-white/10 p-8 sm:p-10 text-cream shadow-2xl">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 text-sand/60 hover:text-cream text-2xl transition cursor-pointer"
          aria-label="Close dialog"
        >
          ✕
        </button>

        {isSuccess ? (
          <div className="py-12 text-center">
            <span className="font-serif text-3xl text-golden">Thank You</span>
            <p className="mt-4 text-sand/80 text-sm leading-relaxed">
              Your inquiry for <strong>{formData.interest}</strong> has been
              received. Our sales advisory team will reach out to you within 24
              hours.
            </p>
            <button
              type="button"
              onClick={() => {
                setIsSuccess(false);
                onClose();
              }}
              className="mt-8 rounded-full bg-golden px-8 py-3 text-xs uppercase tracking-widest text-pine-green font-medium transition hover:bg-cream"
            >
              Close
            </button>
          </div>
        ) : (
          <div>
            <span className="small text-xs uppercase tracking-widest text-golden font-medium">
              Sales &amp; Consultations
            </span>
            <h2 className="heading-3 font-serif text-cream mt-1 mb-6">
              Inquire About Belgrade Arbor
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs uppercase tracking-wider text-sand/70 block mb-1">
                  Full Name*
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-cream placeholder-white/30 focus:border-golden outline-none transition"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-sand/70 block mb-1">
                  Email Address*
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-cream placeholder-white/30 focus:border-golden outline-none transition"
                  placeholder="name@example.com"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-sand/70 block mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-cream placeholder-white/30 focus:border-golden outline-none transition"
                  placeholder="+381 ..."
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-sand/70 block mb-1">
                  Area of Interest
                </label>
                <select
                  value={formData.interest}
                  onChange={(e) =>
                    setFormData({ ...formData, interest: e.target.value })
                  }
                  className="w-full rounded-xl bg-[#2a3429] border border-white/10 px-4 py-3 text-sm text-cream focus:border-golden outline-none transition cursor-pointer"
                >
                  <option value="Studio">Studio Apartment</option>
                  <option value="One Bedroom">One Bedroom Apartment</option>
                  <option value="Two Bedroom">Two Bedroom Apartment</option>
                  <option value="Three Bedroom">Three Bedroom Apartment</option>
                  <option value="Four Bedroom">Four Bedroom Apartment</option>
                  <option value="Office Wing">Office Space (Wing A / B / V)</option>
                  <option value="Retail">Retail &amp; Hospitality Unit</option>
                  <option value="General Inquiry">General Investment Inquiry</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full rounded-full bg-golden py-3.5 px-6 text-xs uppercase tracking-widest text-pine-green font-medium transition hover:bg-cream cursor-pointer"
                >
                  Send Inquiry →
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
