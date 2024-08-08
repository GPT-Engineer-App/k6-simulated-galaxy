import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Star, Paw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const CatBreed = ({ name, description, rating, onRatingChange }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Card className="mb-4 hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span className="flex items-center">
            <Paw className="h-6 w-6 mr-2 text-purple-500" />
            {name}
          </span>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-5 w-5 cursor-pointer transition-colors duration-200 ${
                  star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                }`}
                onClick={() => onRatingChange(star)}
              />
            ))}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  </motion.div>
);

const Index = () => {
  const [catBreeds, setCatBreeds] = useState([
    { name: "Siamese", description: "Known for their distinctive color points and blue eyes.", rating: 0 },
    { name: "Maine Coon", description: "One of the largest domestic cat breeds, known for their intelligence and playful personality.", rating: 0 },
    { name: "Persian", description: "Recognized for their long fur and flat faces.", rating: 0 },
    { name: "Bengal", description: "Known for their wild appearance and energetic personality.", rating: 0 },
    { name: "Sphynx", description: "Distinctive for their lack of fur and wrinkled skin.", rating: 0 },
  ]);

  const [activeTab, setActiveTab] = useState("about");
  const [funFact, setFunFact] = useState("");

  const handleRatingChange = (index, newRating) => {
    const updatedBreeds = [...catBreeds];
    updatedBreeds[index].rating = newRating;
    setCatBreeds(updatedBreeds);
  };

  const catImages = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Kittyply_edit1.jpg/1200px-Kittyply_edit1.jpg",
  ];

  const funFacts = [
    "Cats sleep for about 70% of their lives.",
    "A group of cats is called a clowder.",
    "Cats have over 20 vocalizations, including the meow.",
    "A cat's sense of smell is 14 times stronger than a human's.",
    "Cats can jump up to six times their length.",
  ];

  useEffect(() => {
    const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
    setFunFact(randomFact);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 p-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl font-bold mb-6 text-center text-purple-800"
        >
          All About Cats
        </motion.h1>
        
        <Carousel className="mb-8">
          <CarouselContent>
            {catImages.map((src, index) => (
              <CarouselItem key={index}>
                <motion.img
                  src={src}
                  alt={`Cat ${index + 1}`}
                  className="mx-auto object-cover w-full h-[400px] rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-yellow-100 p-4 rounded-lg mb-8 text-center"
        >
          <p className="text-lg font-semibold text-yellow-800">Fun Fact: {funFact}</p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="about">About Cats</TabsTrigger>
            <TabsTrigger value="breeds">Cat Breeds</TabsTrigger>
            <TabsTrigger value="care">Cat Care</TabsTrigger>
          </TabsList>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TabsContent value="about">
                <Card>
                  <CardHeader>
                    <CardTitle>About Cats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xl text-gray-700">
                      Cats are fascinating creatures that have been domesticated for thousands of years. They are known for their
                      independence, agility, and affectionate nature. Cats come in various breeds, each with its unique
                      characteristics and personalities.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="breeds">
                <Card>
                  <CardHeader>
                    <CardTitle>Popular Cat Breeds</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {catBreeds.map((breed, index) => (
                      <CatBreed
                        key={index}
                        name={breed.name}
                        description={breed.description}
                        rating={breed.rating}
                        onRatingChange={(newRating) => handleRatingChange(index, newRating)}
                      />
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="care">
                <Card>
                  <CardHeader>
                    <CardTitle>Cat Care Tips</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Provide a balanced diet suitable for your cat's age and health condition</li>
                      <li>Ensure fresh water is always available</li>
                      <li>Regular grooming to keep their coat healthy</li>
                      <li>Schedule regular check-ups with a veterinarian</li>
                      <li>Provide mental stimulation with toys and play sessions</li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-center"
        >
          <Button
            onClick={() => {
              const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
              setFunFact(randomFact);
            }}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Get Another Fun Fact
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
