import React from 'react';
import { Star, Quote } from 'lucide-react';
import siteConfig from '@/config/siteConfig.js';

const CustomerReviews = () => {
  if (!siteConfig.customerReviews.enabled) return null;
  const reviews = [
    {
      name: 'Priya Sharma',
      location: 'Mumbai',
      rating: 5,
      review: 'Absolutely love the quality of sarees! The fabric is premium and the designs are stunning. Will definitely order again.',
      image: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=1e40af&color=fff'
    },
    {
      name: 'Anjali Reddy',
      location: 'Hyderabad',
      rating: 5,
      review: 'Fast delivery and beautiful packaging. The kurti I ordered fits perfectly and looks exactly like the pictures.',
      image: 'https://ui-avatars.com/api/?name=Anjali+Reddy&background=1e40af&color=fff'
    },
    {
      name: 'Meera Patel',
      location: 'Ahmedabad',
      rating: 5,
      review: 'Excellent customer service! They helped me choose the perfect lehenga for my sister\'s wedding. Highly recommended!',
      image: 'https://ui-avatars.com/api/?name=Meera+Patel&background=1e40af&color=fff'
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-muted-foreground text-lg">Trusted by thousands of happy customers across India</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-card p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-border"
            >
              <Quote className="w-10 h-10 text-primary mb-4 opacity-50" />
              
              <div className="flex mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-foreground mb-6 leading-relaxed">{review.review}</p>

              <div className="flex items-center">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">{review.name}</h4>
                  <p className="text-sm text-muted-foreground">{review.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Overall Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-6">
            <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
            <div className="text-muted-foreground">Happy Customers</div>
          </div>
          <div className="p-6">
            <div className="text-4xl font-bold text-primary mb-2">4.8/5</div>
            <div className="text-muted-foreground">Average Rating</div>
          </div>
          <div className="p-6">
            <div className="text-4xl font-bold text-primary mb-2">5,000+</div>
            <div className="text-muted-foreground">Products Sold</div>
          </div>
          <div className="p-6">
            <div className="text-4xl font-bold text-primary mb-2">98%</div>
            <div className="text-muted-foreground">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
