type CardProps = {
  title: string;
  icon: string;
};

export default function Card({ title, icon }: CardProps) {
  return (
    <div className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition">
      <div className="text-4xl">{icon}</div>
      <h2 className="mt-3 text-lg font-semibold">
        {title}
      </h2>
    </div>
  );
}
