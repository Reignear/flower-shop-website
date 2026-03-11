import PublicLayout from "@/components/layout/public-layout";
import { Card } from "@/components/ui/card";
import {
  story1,
  story2,
  story3,
  values,
  owner,
} from "@/data/public-about-data";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function About() {
  return (
    <PublicLayout
      title="About Celestial Bloom"
      description="Discover our story, values, and commitment to excellence"
    >
      <div className="max-w-6xl mx-auto p-5">
        <section className="mb-16 max-w-3xl">
          <h2 className="text-xl md:text-3xl  font-bold text-primary mb-6">
            Our Story
          </h2>
          <p className="text-base md:text-lg text-justify text-foreground/70 leading-relaxed mb-4 ">
            {story1}
          </p>
          <p className="text-base md:text-lg text-foreground/70 leading-relaxed mb-4 text-justify">
            {story2}
          </p>
          <p className="text-base md:text-lg text-foreground/70 leading-relaxed text-justify">
            {story3}
          </p>
        </section>
        {/* Values */}
        <section className="mb-16">
          <h2 className="text-xl md:text-3xl  font-bold text-primary mb-8">
            Our Values
          </h2>
          <div className="grid grid-cols-1 gap-3 md:gap-8">
            {values.map((val, index) => (
              <Card
                className="p-5 border border-border hover:scale-101 transition-all hover:shadow-sm duration-200"
                key={index}
              >
                <Collapsible>
                  <CollapsibleTrigger className="w-full">
                    <div className="flex justify-between w-full items-center">
                      <h3 className="text-base md:text-2xl  font-bold text-primary mb-4">
                        {val.title}
                      </h3>
                      <ChevronDown />
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-5">
                  <Separator/> 
                    <p className="text-foreground/70 text-justify text-sm md:text-base">
                      {val.description}
                    </p>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            ))}
          </div>
        </section>
        {/* Team */}
        <section className="mb-16">
          <h2 className="text-xl md:text-3xl  font-bold text-primary mb-8">
            Meet the Owner
          </h2>
          <p className="text-base md:text-lg text-foreground/70 leading-relaxed mb-8 text-justify">
            Behind Celestial Bloom is a passionate floral designer with a deep
            love for flowers and dedication to exceptional customer service.
            Every arrangement is crafted with care to create magical moments.
          </p>

          <div className="max-w-sm mx-auto border border-border text-center rounded-lg shadow-md overflow-hidden h-90 flex items-end py-5 relative group">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
              style={{ backgroundImage: `url(${owner.img})` }}
            />
            <div className="bg-background/40 backdrop-blur-sm p-3 w-full relative z-10">
              <h3 className="text-lg font-semibold text-primary mb-1">
                {owner.name}
              </h3>
              <p className="text-sm text-foreground/60 mb-2">{owner.role}</p>
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}
