import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus, Minus } from "lucide-react";

import "./Faq.css";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "What does Abhishek specialize in?",
    answer:
      "Abhishek R specializes in MERN stack development, React.js, Node.js, and full-stack web application development.",
  },
  {
    question: "Does Abhishek work with international clients?",
    answer:
      "Yes. Abhishek works remotely with clients and businesses worldwide on web development projects.",
  },
  {
    question: "What technologies does Abhishek use?",
    answer:
      "Abhishek works with React.js, Tailwind CSS, Node.js, Express.js, MongoDB, Shopify, custom CSS, and other modern web technologies.",
  },
  {
    question: "Can Abhishek build custom web applications?",
    answer:
      "Yes. Abhishek develops custom web applications based on project requirements, including frontend interfaces, backend APIs, databases, authentication, and third-party integrations.",
  },
  {
    question: "Can Abhishek develop e-commerce websites?",
    answer:
      "Yes. Abhishek can build and customize e-commerce websites using Shopify, React, and other modern web technologies based on the business requirements.",
  },
  {
    question: "Does Abhishek provide website maintenance and support?",
    answer:
      "Yes. Website maintenance, bug fixes, performance improvements, feature updates, and ongoing technical support can be provided based on the project requirements.",
  },
];

export default function FAQ() {
  const sectionRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      tl.from(".faqTag", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      })
        .from(
          ".faqTitle",
          {
            y: 60,
            opacity: 0,
            duration: 0.9,
            ease: "power4.out",
          },
          "-=0.25"
        )
        .from(
          ".faqSubtitle",
          {
            y: 30,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          ".faqItem",
          {
            y: 30,
            opacity: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.3"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section
      className="faqSection"
      ref={sectionRef}
      id="faq"
      aria-labelledby="faq-heading"
    >
      <div className="faqContainer">

        {/* Heading */}
        <header className="faqHeader">
          <span className="faqTag">FAQ</span>

          <h2 className="faqTitle" id="faq-heading">
            Got Questions?
            <br />
            <span>We've Got Answers.</span>
          </h2>

          <p className="faqSubtitle">
            Everything you need to know about working with Abhishek
            on your next web development project.
          </p>
        </header>

        {/* FAQ List */}
        <div className="faqList">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const answerId = `faq-answer-${index}`;

            return (
              <article
                className={`faqItem ${isOpen ? "faqItemOpen" : ""}`}
                key={faq.question}
              >
                {/* Semantic Question Heading */}
                <h3 className="faqQuestionHeading">
                  <button
                    type="button"
                    className="faqQuestion"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                  >
                    <span>
                      <small aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </small>

                      <span>{faq.question}</span>
                    </span>

                    <span className="faqIcon" aria-hidden="true">
                      {isOpen ? (
                        <Minus size={22} />
                      ) : (
                        <Plus size={22} />
                      )}
                    </span>
                  </button>
                </h3>

                {/* Semantic Answer */}
                <div
                  id={answerId}
                  className={`faqAnswer ${
                    isOpen ? "faqAnswerOpen" : ""
                  }`}
                  aria-hidden={!isOpen}
                >
                  <p>{faq.answer}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}