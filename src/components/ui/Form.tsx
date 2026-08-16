"use client";

import React, { useState } from "react";
import { cn } from "@/utils/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({ label, error, className, id, ...props }: InputProps) {
  const [focused, setFocused] = useState(false);
  
  // Safeguard value check to maintain float layout when value exists
  const hasValue = props.value !== undefined && props.value !== null && props.value !== "";

  return (
    <div className="relative w-full mb-6">
      <input
        id={id}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={cn(
          "w-full px-4 py-3 bg-surface/50 border border-border text-sm rounded-lg focus:outline-none focus:border-accent text-text placeholder-transparent transition-all duration-300",
          error ? "border-red-500/50 focus:border-red-500" : "",
          className
        )}
        {...props}
      />
      <label
        htmlFor={id}
        className={cn(
          "absolute left-4 pointer-events-none transition-all duration-300 text-xs text-text/40 uppercase tracking-widest",
          focused || hasValue || props.placeholder
            ? "-top-2.5 left-3 px-1.5 bg-surface text-[10px] text-accent font-bold"
            : "top-3.5 text-sm"
        )}
      >
        {label}
      </label>
      {error && (
        <span className="text-[10px] font-semibold text-red-500 mt-1 block uppercase tracking-wider pl-1">
          {error}
        </span>
      )}
    </div>
  );
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export function TextArea({ label, error, className, id, ...props }: TextAreaProps) {
  const [focused, setFocused] = useState(false);
  const hasValue = props.value !== undefined && props.value !== null && props.value !== "";

  return (
    <div className="relative w-full mb-6">
      <textarea
        id={id}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={props.rows || 4}
        className={cn(
          "w-full px-4 py-3 bg-surface/50 border border-border text-sm rounded-lg focus:outline-none focus:border-accent text-text placeholder-transparent transition-all duration-300 resize-none",
          error ? "border-red-500/50 focus:border-red-500" : "",
          className
        )}
        {...props}
      />
      <label
        htmlFor={id}
        className={cn(
          "absolute left-4 pointer-events-none transition-all duration-300 text-xs text-text/40 uppercase tracking-widest",
          focused || hasValue || props.placeholder
            ? "-top-2.5 left-3 px-1.5 bg-surface text-[10px] text-accent font-bold"
            : "top-3.5 text-sm"
        )}
      >
        {label}
      </label>
      {error && (
        <span className="text-[10px] font-semibold text-red-500 mt-1 block uppercase tracking-wider pl-1">
          {error}
        </span>
      )}
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
}

export function Select({ label, error, options, className, id, ...props }: SelectProps) {
  const [focused, setFocused] = useState(false);
  const hasValue = props.value !== undefined && props.value !== null && props.value !== "";

  return (
    <div className="relative w-full mb-6">
      <select
        id={id}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={cn(
          "w-full px-4 py-3 bg-surface/50 border border-border text-sm rounded-lg focus:outline-none focus:border-accent text-text/80 transition-all duration-300 appearance-none",
          error ? "border-red-500/50 focus:border-red-500" : "",
          className
        )}
        {...props}
      >
        <option value="" disabled hidden>
          Select an option...
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-surface text-text">
            {opt.label}
          </option>
        ))}
      </select>
      {/* Decorative arrow icon overlay */}
      <div className="absolute right-4 top-4 pointer-events-none w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-text/50" />
      <label
        htmlFor={id}
        className={cn(
          "absolute pointer-events-none transition-all duration-300 text-xs uppercase tracking-widest",
          "-top-2.5 left-3 px-1.5 bg-background text-[10px] text-accent font-bold"
        )}
      >
        {label}
      </label>
      {error && (
        <span className="text-[10px] font-semibold text-red-500 mt-1 block uppercase tracking-wider pl-1">
          {error}
        </span>
      )}
    </div>
  );
}
