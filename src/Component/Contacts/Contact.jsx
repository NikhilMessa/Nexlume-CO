import React, { useState, useEffect, useRef } from "react";
import "./Contact.css";
import { toast } from "react-toastify";
// const defaultSocialLinks = [
//   {
//     id: "1",
//     name: "Instagram",
//     iconSrc:
//       "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg",
//     href: "https://www.instagram.com/nexlume",
//   },
//   {
//     id: "2",
//     name: "LinkedIn",
//     iconSrc:
//       "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg",
//     href: "https://www.linkedin.com/in/nexlume-co-463256384/",
//   },
// ];

const API_BASE = import.meta.env.VITE_API_BASE;

const countryOptions = [
  { code: "+1", label: "USA", placeholder: "1234567890", maxLength: 10 },
  { code: "+44", label: "GBR", placeholder: "7123456789", maxLength: 10 },
  { code: "+61", label: "AUS", placeholder: "412345678", maxLength: 9 },
  { code: "+91", label: "IND", placeholder: "1234567890", maxLength: 10 },
  { code: "+65", label: "SGP", placeholder: "91234567", maxLength: 8 },
  { code: "+81", label: "JPN", placeholder: "09012345678", maxLength: 11 },
  { code: "+49", label: "DEU", placeholder: "15123456789", maxLength: 11 },
  { code: "+33", label: "FRA", placeholder: "0612345678", maxLength: 10 },
  { code: "+86", label: "CHN", placeholder: "13800138000", maxLength: 11 },
];

const ContactSection = ({
  title = "We can turn your dream project into reality",
  contactEmail = "nexlume.co@gmail.com",
  // socialLinks = defaultSocialLinks,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    countryCode: "+91",
    socialMedia: "",
    budget: "",
    services: [],
    message: "",
  });

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const businessNameRef = useRef(null);
  const phoneRef = useRef(null);
  // const budgetRef = useRef(null);
  const servicesRef = useRef(null);
  const messageRef = useRef(null);

  // Auto detect country code based on browser locale
  useEffect(() => {
    const getCountryCode = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();

        if (data && data.country_calling_code) {
          setFormData((prev) => ({
            ...prev,
            countryCode: data.country_calling_code,
          }));
        } else {
          setFormData((prev) => ({ ...prev, countryCode: "+91" }));
        }
      } catch (error) {
        console.error("Error detecting country code:", error);
        setFormData((prev) => ({ ...prev, countryCode: "+91" }));
      }
    };

    getCountryCode();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "countryCode") {
      const newCountry = countryOptions.find((c) => c.code === value);
      setFormData((prev) => ({
        ...prev,
        countryCode: value,
        phone: prev.phone.slice(0, newCountry?.maxLength || 10),
      }));
      return;
    }

    const normalizedValue = name === "phone" ? value.replace(/\D/g, "") : value;
    setFormData((prev) => ({ ...prev, [name]: normalizedValue }));
  };

  // derive phone placeholder and maxLength based on selected country
  const currentCountry = countryOptions.find(
    (c) => c.code === formData.countryCode,
  );
  const phonePlaceholder = currentCountry?.placeholder || "1234567890";
  const phoneMaxLength = currentCountry?.maxLength || 10;

  const handleCheckboxChange = (service, checked) => {
    setFormData((prev) => {
      const updated = checked
        ? [...prev.services, service]
        : prev.services.filter((s) => s !== service);
      return { ...prev, services: updated };
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const focusField = (ref) => {
    if (ref?.current) {
      ref.current.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss(); // ← add this line

    
    if (!formData.name.trim()) {
      toast.warning("Full name is required.");
      focusField(nameRef);
      return;
    }

    if (!formData.email.trim()) {
      toast.warning("Email address is required.");
      focusField(emailRef);
      return;
    }

    if (!validateEmail(formData.email)) {
      toast.warning("Please enter a valid email address.");
      focusField(emailRef);
      return;
    }

    if (!formData.businessName.trim()) {
      toast.warning("Company name is required.");
      focusField(businessNameRef);
      return;
    }

    if (!formData.phone.trim()) {
      toast.warning("Phone number is required.");
      focusField(phoneRef);
      return;
    }

    const cleanedPhone = formData.phone.replace(/\D/g, "");
    const requiredPhoneLength = phoneMaxLength || 10;
    if (cleanedPhone.length < requiredPhoneLength) {
      toast.warning("Please enter a valid phone number.");
      focusField(phoneRef);
      return;
    }

    // if (!formData.budget) {
    //   toast.warning("Please select your budget range.");
    //   focusField(budgetRef);
    //   return;
    // }

    if (!formData.services || formData.services.length === 0) {
      toast.warning("Please select at least one service.");
      if (servicesRef?.current) servicesRef.current.focus();
      return;
    }

    if (!formData.message.trim()) {
      toast.warning("Please tell us about your project.");
      focusField(messageRef);
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/api/contact/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.warning(data.message || "Something went wrong. Please try again.");
        return;
      }

      // ✅ FREE beginner setup message
      toast.success("Thanks for contacting NexLume. Our team will reach out soon.");

      // OPTIONAL: reset form
      setFormData({
        name: "",
        businessName: "",
        email: "",
        phone: "",
        countryCode: "+91",
        socialMedia: "",
        budget: "",
        services: [],
        message: "",
      });
    } catch (error) {
      console.error("Contact submit failed:", error);
      toast.error("Network error. Please try again later.");
    }
  };

  const serviceOptions = [
    "Website Design",
    "Web Development",
    "E-commerce Website",
    "Landing Page",
    "UI/UX Design",
    "SEO & Performance",
    "Website Maintenance",
    "Branding for Web",
    "Conversion Optimization",
  ];

  const budgetOptions = [
    "₹5,000 - ₹10,000",
    "₹10,000 - ₹15,000",
    "₹15,000 - ₹20,000",
  ];

  return (
    <section className="contact-section">
      {/* Background elements */}
      <div className="contact-bg-gradient"></div>
      <div className="contact-noise"></div>

      <div className="contact-wrapper">
        {/* Header Section */}
        <div className="contact-header-section">
          <div className="header-label">Get In Touch</div>
          <h1 className="header-main-title">{title}</h1>
          <p className="header-description">
            Ready to transform your ideas into reality? Let's collaborate and
            create something extraordinary together.
          </p>
        </div>

        <div className="contact-main-grid">
          {/* Left Column - Contact Info */}
          <div className="contact-info-column">
            <div className="info-block">
              <h3 className="info-title">Direct Contact</h3>
              <a href={`mailto:${contactEmail}`} className="email-link">
                {contactEmail}
              </a>
              <p className="info-subtitle">
                We typically respond within 24 hours
              </p>
            </div>

            {/* <div className="info-block">
              <h3 className="info-title">Connect With Us</h3>
              <div className="socials-grid">
                {socialLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    className="social-item"
                    title={link.name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={link.iconSrc} alt={link.name} />
                    <span>{link.name}</span>
                  </a>
                ))}
              </div>
            </div> */}

            <div className="info-block">
              <h3 className="info-title">Why Choose Us</h3>
              <ul className="benefits-list">
                <li>Custom solutions tailored to your needs</li>
                <li>Expert team with proven track record</li>
                <li>Transparent communication always</li>
                <li>Timely delivery and support</li>
              </ul>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="contact-form-column">
            <form onSubmit={handleSubmit} noValidate  className="contact-form">
              <div className="form-section">
                <h3 className="form-section-title">Your Information</h3>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      ref={nameRef}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      ref={emailRef}
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label htmlFor="businessName">Company Name</label>
                    <input
                      id="businessName"
                      name="businessName"
                      placeholder="Your Company"
                      value={formData.businessName}
                      onChange={handleChange}
                      required
                      ref={businessNameRef}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <div className="phone-input-group">
                      <select
                        id="countryCode"
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleChange}
                        className="country-code-select"
                        aria-label="Country calling code"
                      >
                        {countryOptions.map((country) => (
                          <option key={country.code} value={country.code}>
                            {country.label} {country.code}
                          </option>
                        ))}
                      </select>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        placeholder={phonePlaceholder}
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        maxLength={phoneMaxLength}
                        ref={phoneRef}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="socialMedia">
                    Social Media{" "}
                    <span className="optional-text">(Optional)</span>
                  </label>
                  <input
                    id="socialMedia"
                    name="socialMedia"
                    placeholder="@yourhandle or profile link"
                    value={formData.socialMedia}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-section">
                <h3 className="form-section-title">Project Details</h3>

                <div className="form-group full-width">
                  <label htmlFor="budget">Budget Range</label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                    // ref={budgetRef}
                  >
                    <option value="">Select your budget</option>
                    {budgetOptions.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group full-width">
                  <label>What services interest you?</label>
                  <div className="services-checkboxes" ref={servicesRef} tabIndex={-1}>
                    {serviceOptions.map((service) => (
                      <label key={service} className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={formData.services.includes(service)}
                          onChange={(e) =>
                            handleCheckboxChange(service, e.target.checked)
                          }
                        />
                        <span>{service}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="message">Tell us about your project</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Describe your vision, goals, timeline, and any specific requirements..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    ref={messageRef}
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-button">
                  Send Inquiry
                  <svg
                    className="button-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
