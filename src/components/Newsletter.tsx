import React, { useRef, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import emailjs from "@emailjs/browser";
const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }
    setIsSubmitting(true);

    const serviceId = "service_ss9lq8j";
    const templateId = "template_85iusf9";
    const publicKey = "hGCClp1K0BZRIIIlS";

    // Ensure submitted_at is included for templates expecting it
    const submittedAt = new Date().toLocaleString();
    if (formRef.current) {
      // add/update hidden submitted_at input before sendForm
      let hidden = formRef.current.querySelector<HTMLInputElement>('input[name="submitted_at"]');
      if (!hidden) {
        hidden = document.createElement('input');
        hidden.type = 'hidden';
        hidden.name = 'submitted_at';
        formRef.current.appendChild(hidden);
      }
      hidden.value = submittedAt;
    }

    emailjs
      .sendForm(serviceId, templateId, formRef.current!, publicKey)
      .then(() => {
        toast({
          title: "Submitted!",
          description: "We received your request and will be in touch."
        });
        setEmail("");
        setSuggestion("");
      })
      .catch(() => {
        toast({
          title: "Submission failed",
          description: "Please try again in a moment.",
          variant: "destructive"
        });
      })
      .finally(() => setIsSubmitting(false));
  };
  return <section id="newsletter" className="bg-white py-0">
      <div className="section-container opacity-100 animate-on-scroll">
        <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
        <div className="flex items-center gap-4 mb-8 sm:mb-16">
          <div className="flex items-center gap-4">
            <div className="pulse-chip">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-pulse-500 text-white mr-2">04</span>
              <span>Waitlist</span>
            </div>
          </div>
          <div className="flex-1 h-[1px] bg-gray-300"></div>
        </div>
          <h2 className="section-title mb-3 sm:mb-4 opacity-100 fade-in-element">
            Join the Waitlist
          </h2>
          <p className="section-subtitle mx-auto opacity-100 fade-in-element">
          Be part of our early community. Join the Vault waitlist for exclusive updates, early access, and rewards when we launch.
          </p>
        </div>        

          <div className="w-full max-w-3xl mx-auto glass-card shadow-elegant hover:shadow-elegant-hover transition-all duration-300 rounded-3xl border border-gray-200 p-6 sm:p-8 md:p-10">
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4 items-stretch w-full ">
            <div className="relative w-full">
              <input 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                placeholder="Email address" 
                name="email"
                className="w-full px-6 py-4 rounded-full border border-gray-500 focus:outline-none focus:ring-2 focus:ring-pulse-500 text-gray-700" 
                required 
              />
            </div>
            <div className="relative w-full">
              <textarea 
                placeholder="Suggestion (optional)"
                value={suggestion}
                onChange={e => setSuggestion(e.target.value)}
                name="suggestion"
                className="w-full px-6 py-4 rounded-3xl border border-gray-500 focus:outline-none focus:ring-2 focus:ring-pulse-500 text-gray-700 min-h-[110px]"
              />
            </div>
            <div className="w-full">
              <button type="submit" disabled={isSubmitting} className="button-primary button-animated w-full py-4 rounded-full">
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
          </div>
        </div>
      </div>
    </section>;
};
export default Newsletter;
