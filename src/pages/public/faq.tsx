import PublicLayout from "@/components/layout/public-layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqData } from "@/data/public-faqs-data";

export default function FAQsPage() {
  return (
    <PublicLayout
      title="Frequently Asked Questions"
      description="Find answers to common questions about our products, services, and policies"
    >
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        {faqData.map((category) => (
          <div key={category.title} className="mb-10 md:mb-12">
            <h2 className="text-lg md:text-2xl font-bold text-primary mb-4 md:mb-6">
              {category.title}
            </h2>
            <Accordion type="single" collapsible className="space-y-3">
              {category.items.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`${category.title}-${index}`}
                  className="border border-border rounded-lg overflow-hidden"
                >
                  <AccordionTrigger className="px-4 py-3 md:px-6 md:py-4 hover:bg-secondary transition-colors text-left">
                    <span className="font-semibold text-foreground text-sm md:text-base">
                      {item.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-3 md:px-6 md:py-4 bg-secondary text-foreground/70 text-sm md:text-base">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}

        {/* Still have questions? */}
        <div className="bg-secondary rounded-lg p-6 md:p-8 text-center mt-10 md:mt-12">
          <h3 className="text-xl md:text-2xl font-bold text-primary mb-3 md:mb-4">
            Still have questions?
          </h3>
          <p className="text-foreground/70 text-sm md:text-base mb-5 md:mb-6">
            Can't find the answer you're looking for? Our customer support team
            is here to help.
          </p>
          <a
            href="/contact"
            className="inline-block w-full md:w-auto bg-primary text-primary-foreground px-6 md:px-8 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors text-sm md:text-base"
          >
            Contact Us
          </a>
        </div>
      </div>
    </PublicLayout>
  );
}
