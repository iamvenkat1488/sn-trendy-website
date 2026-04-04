import React from 'react';
import { Sparkles, TrendingUp, IndianRupee, Award } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    {
      icon: Sparkles,
      title: 'Premium Quality',
      description: 'Handpicked fabrics and exquisite craftsmanship in every piece'
    },
    {
      icon: TrendingUp,
      title: 'Latest Trends',
      description: 'Stay ahead with our curated collection of trending designs'
    },
    {
      icon: IndianRupee,
      title: 'Affordable Luxury',
      description: 'Premium fashion at prices that won\'t break the bank'
    },
    {
      icon: Award,
      title: 'Trusted by 10,000+',
      description: 'Join thousands of satisfied customers across India'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-secondary to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Why Choose SN Trendy Collections
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the perfect blend of tradition and modernity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
