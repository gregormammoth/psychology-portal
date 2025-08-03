import { Parallax } from 'react-parallax';

export default function Buffer() {
  return (
    <Parallax
      bgImage="/images/relationships.jpg"
      bgImageAlt="Psychology background"
      strength={200}
      blur={{ min: -5, max: 5 }}
      bgImageStyle={{
        objectFit: 'cover',
        objectPosition: 'center',
      }}
    >
      <div className="h-96 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Building Strong Relationships</h2>
          <p className="text-xl">Discover the power of meaningful connections</p>
        </div>
      </div>
    </Parallax>
  );
}