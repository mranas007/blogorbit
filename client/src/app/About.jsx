import { React, useEffect } from "react";
import Header from "../components/app/Header";
import Footer from "../components/app/Footer";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const About = () => {
  // check it user's token exist then redirect to home
  const navigate = useNavigate();
  const { token } = useAuthContext();

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [token, navigate]);


  const teamMembers = [
    {
      name: "John Doe",
      role: "Founder & Visionary",
      image: "https://via.placeholder.com/300"
    },
    {
      name: "Jane Smith",
      role: "Tech Innovation Lead",
      image: "https://via.placeholder.com/300"
    },
    {
      name: "Alex Johnson",
      role: "Creative Director",
      image: "https://via.placeholder.com/300"
    }
  ];
  return (
    <>

      <Header />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">

        {/* Hero Section with Overlapping Elements */}
        <section className="h-screen relative pt-40 pb-32 px-6 overflow-hidden ">
          {/* Decorative Background Elements */}
          <div className=" absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
            <div className="absolute top-20 right-10 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
            <div className="absolute -bottom-8 left-20 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
          </div>

          <div className="relative max-w-6xl mx-auto">
            <div className="flex flex-col items-center text-center mb-16">
              {/* icon */}
              <div className="w-56 relative -top-11">
                <img src="/assets/svg/SparkleIcon.svg" alt="svg..." className="w-full" />
              </div>
              <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-6 p-2">
                Crafting Digital Experiences
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl">
                We're a collective of passionate creators, thinkers, and innovators dedicated to sharing knowledge and inspiring the next generation of digital pioneers.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section with Diagonal Layout */}
        <section className="w-full overflow-hidden">
          <div className="relative py-24 bg-white skew-y-3 z-0">
            <div className="max-w-6xl mx-auto px-6 -skew-y-3">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <h2 className="text-4xl font-bold text-gray-900">Our Mission</h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    We believe in the power of knowledge sharing and community building. Our platform serves as a bridge between complex technical concepts and practical applications, making technology accessible to everyone.
                  </p>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-6 bg-indigo-50 rounded-xl">
                      <h3 className="text-xl font-semibold text-indigo-600 mb-2">300+</h3>
                      <p className="text-gray-600">Articles Published</p>
                    </div>
                    <div className="p-6 bg-purple-50 rounded-xl">
                      <h3 className="text-xl font-semibold text-purple-600 mb-2">50k+</h3>
                      <p className="text-gray-600">Monthly Readers</p>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl transform rotate-3" />
                  <img
                    src="https://via.placeholder.com/600x400"
                    alt="Our Mission"
                    className="relative rounded-2xl shadow-lg w-full h-full object-cover transform -rotate-3 transition-transform duration-300 hover:rotate-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section with Modern Cards */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Meet Our Creative Minds
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="aspect-w-3 aspect-h-4">
                    <img
                      src={member.image}
                      alt="image..."
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                    <p className="text-white/80">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default About;