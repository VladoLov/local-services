type CategoryCardProps = {
  categoryValue: string;
  categoryLabel: string;
  icon: string;
  handleNavigate: (value: string) => void;
};

function CategoryCard({
  categoryValue,
  categoryLabel,
  icon,
  handleNavigate,
}: CategoryCardProps) {
  return (
    <div
      onClick={() => handleNavigate(categoryValue)}
      className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 cursor-pointer border border-gray-100 transform hover:scale-[1.02] active:scale-[0.98]"
    >
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-800 text-center">
        {categoryLabel}
      </h3>
      <p className="text-sm text-blue-600 mt-1 font-medium">View Services</p>
    </div>
  );
}
