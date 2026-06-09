import { useState } from "react";
import axios from "axios";
import "./Contact.css";

const CONTACT_INFO = [
  {
    icon: "📍",
    label: " Head office",
    value:
      " Room no - US14, US COMPLEX , 120 Mathura road , Opp Apollo Hospital , Jasola Vihar , New Delhi - 110076",
  },
  {
  icon: "📍",
  label: "Guwahati Branch",
  value: (
    <>
      Santi Basti, Amsing Jorabat, (Narangi Army Cantt)
      <br />
      Guwahati - 781027, ASSAM
      <br />
      Mob - 9085184086
    </>
  ),
},
  {
    icon: "📞",
    label: "Phone Number",
    value:
      "+91 9211566451 , 9717125351"
  },
  {
    icon: "📧",
    label: "Email Address",
    value:
      "osrsolutions51@gmail.com",
  },
  {
    icon: "🕒",
    label: "Working Hours",
    value:
      "Mon - Sat : 10 AM - 6 PM",
  },
];

const SERVICES = [
  "Printing Machines",
  "Machine Repair",
  "Installation",
  "Technical Support",
  "Spare Parts",
];

function Contact_Us() {

  const [form, setForm] =
    useState({
      first: "",
      last: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    });

  const [loading,
    setLoading] =
    useState(false);

  const [sent,
    setSent] =
    useState(false);

  const handle = (
    e
  ) => {

    setForm({
      ...form,

      [e.target.name]:
        e.target.value,
    });
  };

  const submit =
    async () => {

    try {

      setLoading(true);

      await axios.post(
        "https://osr-solutions.onrender.com/api/contact",
        {
          name:
            `${form.first} ${form.last}`,
          email:
            form.email,
          phone:
            form.phone,
          service:
            form.service,
          message:
            form.message,
        }
      );

      setSent(true);

      setForm({
        first: "",
        last: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });

      setTimeout(() => {
        setSent(false);
      }, 3000);

    } catch (error) {

      console.log(error);

      alert(
        "Something went wrong ❌"
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="contact-bg"
    >
      <div className="contact-grid">

        {/* LEFT */}
        <div className="contact-left reveal">

          <h2>
            Let’s Discuss Your
            <span className="glow">
              {" "}
              Machine Needs
            </span>
          </h2>

          <p className="contact-text">
            Need printing machines,
            installation, servicing,
            or technical support?
            Contact our experts today.
          </p>

          <div className="contact-list">
            {CONTACT_INFO.map(
              (c) => (
                <div
                  className="ci"
                  key={c.label}
                >
                  <div className="ci-icon">
                    {c.icon}
                  </div>

                  <div>
                    <div className="ci-label">
                      {c.label}
                    </div>

                    <div className="ci-val">
                      {c.value}
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* FORM */}
        <div className="form-box reveal">

          <h3 className="form-h3">
            Send Message
          </h3>

          <div className="form-row">

            <div className="fg">
              <label>
                First Name
              </label>

              <input
                name="first"
                placeholder="Rahul"
                value={
                  form.first
                }
                onChange={
                  handle
                }
              />
            </div>

            <div className="fg">
              <label>
                Last Name
              </label>

              <input
                name="last"
                placeholder="Sharma"
                value={
                  form.last
                }
                onChange={
                  handle
                }
              />
            </div>
          </div>

          <div className="fg">
            <label>Email</label>

            <input
              name="email"
              type="email"
              placeholder="rahul@email.com"
              value={
                form.email
              }
              onChange={
                handle
              }
            />
          </div>

          <div className="fg">
            <label>Phone</label>

            <input
              name="phone"
              placeholder="+91 9876543210"
              value={
                form.phone
              }
              onChange={
                handle
              }
            />
          </div>

          <div className="fg">
            <label>
              Service Needed
            </label>

            <select
              name="service"
              value={
                form.service
              }
              onChange={
                handle
              }
            >
              <option value="">
                Select Service
              </option>

              {SERVICES.map(
                (s) => (
                  <option
                    key={s}
                  >
                    {s}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="fg">
            <label>
              Message
            </label>

            <textarea
              name="message"
              placeholder="Write your requirement..."
              value={
                form.message
              }
              onChange={
                handle
              }
            />
          </div>

          <button
            className={`btn-submit ${
              sent
                ? "sent"
                : ""
            }`}
            onClick={submit}
            disabled={
              loading
            }
          >
            {loading
              ? "Sending..."
              : sent
              ? "✓ Message Sent"
              : "Send Message"}
          </button>
        </div>
      </div>
    </section>
  );
}

export default Contact_Us;