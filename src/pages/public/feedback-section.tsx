import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SquareArrowOutUpRight, Star } from "lucide-react";
import { Link } from "react-router-dom";

export default function FeedbackSection() {
  const testimonials = [
    {
      name: "Jenny Smith",
      role: "Customer",
      content:
        "Whether you are looking to brighten up your home with a favorite person",
      image:
        "https://imgs.search.brave.com/-3NWpZQiqZzPITopcUn-ggk3qCZvtYY_Nq6ow0ImbjA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTMz/NDEwMjE5Mi9waG90/by9hZHVsdC15b3Vu/Zy13b21hbi1zaWxo/b3VldHRlLXBvcnRy/YWl0LWluLXN0dWRp/by5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9VkJHUW9MVHIz/RHJkTTJPNGhmOF9E/ZHd6bFVKamhrNVlt/UlpYeG96aUs1RT0",
    },
    {
      name: "Sarah Mackenzie",
      role: "Customer",
      content:
        "Whether you are looking to brighten up your home with a favorite person",
      image:
        "https://imgs.search.brave.com/-3NWpZQiqZzPITopcUn-ggk3qCZvtYY_Nq6ow0ImbjA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTMz/NDEwMjE5Mi9waG90/by9hZHVsdC15b3Vu/Zy13b21hbi1zaWxo/b3VldHRlLXBvcnRy/YWl0LWluLXN0dWRp/by5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9VkJHUW9MVHIz/RHJkTTJPNGhmOF9E/ZHd6bFVKamhrNVlt/UlpYeG96aUs1RT0",
    },
    {
      name: "Jenny Smith",
      role: "Customer",
      content:
        "Whether you are looking to brighten up your home with a favorite person",
      image:
        "https://imgs.search.brave.com/-3NWpZQiqZzPITopcUn-ggk3qCZvtYY_Nq6ow0ImbjA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTMz/NDEwMjE5Mi9waG90/by9hZHVsdC15b3Vu/Zy13b21hbi1zaWxo/b3VldHRlLXBvcnRy/YWl0LWluLXN0dWRp/by5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9VkJHUW9MVHIz/RHJkTTJPNGhmOF9E/ZHd6bFVKamhrNVlt/UlpYeG96aUs1RT0",
    },
    {
      name: "Sarah Mackenzie",
      role: "Customer",
      content:
        "Whether you are looking to brighten up your home with a favorite person",
      image:
        "https://imgs.search.brave.com/-3NWpZQiqZzPITopcUn-ggk3qCZvtYY_Nq6ow0ImbjA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTMz/NDEwMjE5Mi9waG90/by9hZHVsdC15b3Vu/Zy13b21hbi1zaWxo/b3VldHRlLXBvcnRy/YWl0LWluLXN0dWRp/by5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9VkJHUW9MVHIz/RHJkTTJPNGhmOF9E/ZHd6bFVKamhrNVlt/UlpYeG96aUs1RT0",
    },
    {
      name: "Jenny Smith",
      role: "Customer",
      content:
        "Whether you are looking to brighten up your home with a favorite person",
      image:
        "https://imgs.search.brave.com/-3NWpZQiqZzPITopcUn-ggk3qCZvtYY_Nq6ow0ImbjA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTMz/NDEwMjE5Mi9waG90/by9hZHVsdC15b3Vu/Zy13b21hbi1zaWxo/b3VldHRlLXBvcnRy/YWl0LWluLXN0dWRp/by5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9VkJHUW9MVHIz/RHJkTTJPNGhmOF9E/ZHd6bFVKamhrNVlt/UlpYeG96aUs1RT0",
    },
    {
      name: "Sarah Mackenzie",
      role: "Customer",
      content:
        "Whether you are looking to brighten up your home with a favorite person",
      image:
        "https://imgs.search.brave.com/-3NWpZQiqZzPITopcUn-ggk3qCZvtYY_Nq6ow0ImbjA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTMz/NDEwMjE5Mi9waG90/by9hZHVsdC15b3Vu/Zy13b21hbi1zaWxo/b3VldHRlLXBvcnRy/YWl0LWluLXN0dWRp/by5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9VkJHUW9MVHIz/RHJkTTJPNGhmOF9E/ZHd6bFVKamhrNVlt/UlpYeG96aUs1RT0",
    },
    {
      name: "Jenny Smith",
      role: "Customer",
      content:
        "Whether you are looking to brighten up your home with a favorite person",
      image:
        "https://imgs.search.brave.com/-3NWpZQiqZzPITopcUn-ggk3qCZvtYY_Nq6ow0ImbjA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTMz/NDEwMjE5Mi9waG90/by9hZHVsdC15b3Vu/Zy13b21hbi1zaWxo/b3VldHRlLXBvcnRy/YWl0LWluLXN0dWRp/by5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9VkJHUW9MVHIz/RHJkTTJPNGhmOF9E/ZHd6bFVKamhrNVlt/UlpYeG96aUs1RT0",
    },
    {
      name: "Sarah Mackenzie",
      role: "Customer",
      content:
        "Whether you are looking to brighten up your home with a favorite person",
      image:
        "https://imgs.search.brave.com/-3NWpZQiqZzPITopcUn-ggk3qCZvtYY_Nq6ow0ImbjA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTMz/NDEwMjE5Mi9waG90/by9hZHVsdC15b3Vu/Zy13b21hbi1zaWxo/b3VldHRlLXBvcnRy/YWl0LWluLXN0dWRp/by5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9VkJHUW9MVHIz/RHJkTTJPNGhmOF9E/ZHd6bFVKamhrNVlt/UlpYeG96aUs1RT0",
    },
  ];
  return (
    <main className="px-4 md:px-8 lg:px-12 py-12 md:py-20 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <p className="text-sm font-semibold text-muted-foreground mb-2 uppercase">
              Feedback
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
              Meet Our Satisfied Customers
            </h2>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto overflow-hidden">
        <div className="flex flex-row gap-8   animate-scroll-left ">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 bg-card border-border min-w-lg  ">
              <div className="flex gap-1 mb-4">
                {[...Array(2)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-300 text-yellow-300"
                  />
                ))}
              </div>
              <p className="text-foreground mb-6 leading-relaxed">
                {testimonial.content}
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div>
          <Link to="/feedback" className="flex justify-start mt-8">
            <Button
              size="lg"
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              View All Feedback <SquareArrowOutUpRight />
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
