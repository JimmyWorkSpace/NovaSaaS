
function FAQSection() {
  return (
    <section className="py-5">
      <div className="container">
        <h3 className="fw-bold mb-4 text-center">FAQ</h3>

        <div className="accordion" id="faqAccordion">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#faq1">
                如何開始？
              </button>
            </h2>
            <div id="faq1" className="accordion-collapse collapse">
              <div className="accordion-body">
                註冊帳號即可開始使用。
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default FAQSection;
