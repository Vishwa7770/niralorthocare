"use client";

import React, { useState } from "react";
import { Calendar, Clock, User, Phone, Mail, FileText, CheckCircle2, AlertCircle, ShieldAlert } from "lucide-react";
import { useLanguage } from "@/components/ui/LanguageContext";

interface FormFields {
  fullName: string;
  phone: string;
  email: string;
  date: string;
  timeSlot: string;
  reason: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  date?: string;
  timeSlot?: string;
  reason?: string;
}

export default function AppointmentPage() {
  const { t } = useLanguage();
  
  const [fields, setFields] = useState<FormFields>({
    fullName: "",
    phone: "",
    email: "",
    date: "",
    timeSlot: "",
    reason: ""
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  // Get tomorrow's date string for input restrictions (min date)
  const getMinDateString = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const validate = (): boolean => {
    const tempErrors: FormErrors = {};
    let isValid = true;

    if (!fields.fullName.trim()) {
      tempErrors.fullName = "Full name is required.";
      isValid = false;
    }

    // Basic phone validation (at least 10 digits)
    const phoneRegex = /^[0-9\s+-]{10,15}$/;
    if (!fields.phone.trim()) {
      tempErrors.phone = "Phone number is required.";
      isValid = false;
    } else if (!phoneRegex.test(fields.phone)) {
      tempErrors.phone = "Provide a valid 10-15 digit phone number.";
      isValid = false;
    }

    // Optional email validation
    if (fields.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(fields.email)) {
        tempErrors.email = "Provide a valid email address.";
        isValid = false;
      }
    }

    if (!fields.date) {
      tempErrors.date = "Select a preferred date.";
      isValid = false;
    } else {
      const selectedDate = new Date(fields.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate <= today) {
        tempErrors.date = "Appointment date must be in the future.";
        isValid = false;
      }
    }

    if (!fields.timeSlot) {
      tempErrors.timeSlot = "Select a preferred time slot.";
      isValid = false;
    }

    if (!fields.reason.trim()) {
      tempErrors.reason = "Reason for visit is required.";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFields({
      ...fields,
      [name]: value
    });
    // Clear validation error when typing
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: undefined
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");

    try {
      const response = await fetch("/api/appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(fields)
      });

      if (response.ok) {
        setStatus("success");
        // Clear fields on success
        setFields({
          fullName: "",
          phone: "",
          email: "",
          date: "",
          timeSlot: "",
          reason: ""
        });
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="w-full pt-32 pb-16 sm:pt-36 bg-white dark:bg-background smooth-transition">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-primary dark:text-primary-accent">
            Secure Booking
          </span>
          <h1 className="text-4xl font-extrabold text-foreground tracking-tight sm:text-5xl">
            {t.appointment.title}
          </h1>
          <p className="text-sm text-text-secondary leading-relaxed max-w-2xl mx-auto">
            {t.appointment.subtitle}
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-bg-secondary dark:bg-card-bg/25 border border-border-color rounded-2xl p-6 sm:p-10 shadow-sm max-w-2xl mx-auto relative overflow-hidden">
          
          {/* Status Alert displays */}
          {status === "success" && (
            <div className="text-center py-8 space-y-4 animate-fade-in">
              <div className="p-4 bg-primary-light dark:bg-primary-light/10 text-primary dark:text-primary-accent rounded-full w-fit mx-auto">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                {t.appointment.success}
              </h2>
              <p className="text-sm text-text-secondary max-w-md mx-auto leading-relaxed">
                {t.appointment.successDesc}
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-6 px-6 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-all text-sm"
              >
                Book Another Appointment
              </button>
            </div>
          )}

          {status === "error" && (
            <div className="p-5 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl space-y-3 mb-8">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold">{t.appointment.error}</h4>
                  <p className="text-xs mt-1 leading-relaxed">{t.appointment.errorDesc}</p>
                </div>
              </div>
              <button
                onClick={() => setStatus("idle")}
                className="text-xs font-bold underline hover:text-red-600 block mt-2"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Booking Form */}
          {status !== "success" && (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Doctor Details Summary header inside form */}
              <div className="pb-6 border-b border-border-color flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">
                  Dr
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">Dr. V.D.N. Madhivanan</h4>
                  <p className="text-xs text-text-secondary">Consulting Orthopedic Surgeon</p>
                </div>
              </div>

              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5" htmlFor="fullName">
                  <User className="w-3.5 h-3.5 text-primary" />
                  <span>{t.appointment.name} *</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={fields.fullName}
                  onChange={handleInputChange}
                  placeholder="e.g. John Doe"
                  className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-background outline-none text-sm smooth-transition focus:ring-2 focus:ring-primary ${
                    errors.fullName ? "border-red-500" : "border-border-color"
                  }`}
                  disabled={status === "loading"}
                />
                {errors.fullName && (
                  <p className="text-xs text-red-500 font-semibold">{errors.fullName}</p>
                )}
              </div>

              {/* Phone Number */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5" htmlFor="phone">
                  <Phone className="w-3.5 h-3.5 text-primary" />
                  <span>{t.appointment.phone} *</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={fields.phone}
                  onChange={handleInputChange}
                  placeholder="e.g. +91 98765 43210"
                  className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-background outline-none text-sm smooth-transition focus:ring-2 focus:ring-primary ${
                    errors.phone ? "border-red-500" : "border-border-color"
                  }`}
                  disabled={status === "loading"}
                />
                {errors.phone && (
                  <p className="text-xs text-red-500 font-semibold">{errors.phone}</p>
                )}
              </div>

              {/* Email (Optional) */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5" htmlFor="email">
                  <Mail className="w-3.5 h-3.5 text-primary" />
                  <span>{t.appointment.email}</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={fields.email}
                  onChange={handleInputChange}
                  placeholder="e.g. john@example.com"
                  className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-background outline-none text-sm smooth-transition focus:ring-2 focus:ring-primary ${
                    errors.email ? "border-red-500" : "border-border-color"
                  }`}
                  disabled={status === "loading"}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 font-semibold">{errors.email}</p>
                )}
              </div>

              {/* Date & Time Slot Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Date */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5" htmlFor="date">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    <span>{t.appointment.date} *</span>
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={fields.date}
                    onChange={handleInputChange}
                    min={getMinDateString()}
                    className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-background outline-none text-sm smooth-transition focus:ring-2 focus:ring-primary ${
                      errors.date ? "border-red-500" : "border-border-color"
                    }`}
                    disabled={status === "loading"}
                  />
                  {errors.date && (
                    <p className="text-xs text-red-500 font-semibold">{errors.date}</p>
                  )}
                </div>

                {/* Time Slot */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5" htmlFor="timeSlot">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    <span>{t.appointment.time} *</span>
                  </label>
                  <select
                    id="timeSlot"
                    name="timeSlot"
                    value={fields.timeSlot}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-background outline-none text-sm smooth-transition focus:ring-2 focus:ring-primary ${
                      errors.timeSlot ? "border-red-500" : "border-border-color"
                    }`}
                    disabled={status === "loading"}
                  >
                    <option value="">-- Select Time Slot --</option>
                    <option value="morning">Morning (10:00 AM - 01:00 PM)</option>
                    <option value="evening">Evening (05:00 PM - 08:00 PM)</option>
                  </select>
                  {errors.timeSlot && (
                    <p className="text-xs text-red-500 font-semibold">{errors.timeSlot}</p>
                  )}
                </div>

              </div>

              {/* Reason for Visit */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5" htmlFor="reason">
                  <FileText className="w-3.5 h-3.5 text-primary" />
                  <span>{t.appointment.reason} *</span>
                </label>
                <textarea
                  id="reason"
                  name="reason"
                  rows={4}
                  value={fields.reason}
                  onChange={handleInputChange}
                  placeholder={t.appointment.reasonPlaceholder}
                  className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-background outline-none text-sm smooth-transition focus:ring-2 focus:ring-primary resize-none ${
                    errors.reason ? "border-red-500" : "border-border-color"
                  }`}
                  disabled={status === "loading"}
                />
                {errors.reason && (
                  <p className="text-xs text-red-500 font-semibold">{errors.reason}</p>
                )}
              </div>

              {/* Submit Action */}
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center bg-primary hover:bg-primary-dark dark:bg-primary-accent dark:hover:bg-primary text-white font-bold py-3.5 rounded-lg text-center transition-all shadow-sm hover:shadow-md cursor-pointer disabled:opacity-50"
                disabled={status === "loading"}
              >
                {status === "loading" ? t.appointment.loading : t.appointment.cta}
              </button>

              {/* Secure Notice */}
              <div className="border-t border-border-color pt-4 flex gap-2.5 items-start">
                <ShieldAlert className="w-4.5 h-4.5 text-text-secondary shrink-0 mt-0.5" />
                <p className="text-[10px] text-text-secondary leading-normal">
                  Important: Online requests represent a slot request, NOT a guaranteed final confirmation. Niral Ortho Care administration staff will contact you via your phone number to coordinate doctor availability and finalize booking.
                </p>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
}
