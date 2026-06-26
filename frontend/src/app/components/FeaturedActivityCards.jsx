const FeaturedActivityCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white border border-[#EBE8DF] p-4 hover:shadow-lg transition-transform hover:-translate-y-1 duration-300">
    <div className="flex items-center gap-3 mb-3">
      <div className="w-12 h-12 bg-[#FAF9F6] border border-[#EBE8DF] rounded-full flex items-center justify-center ">
        <Icon className="w-5 h-5 text-[#16A34A]" />
      </div>
      <h4 className="text-lg font-medium text-[#1C2421]">{title}</h4>
    </div>
    <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
      {description}
    </p>
  </div>
);

export default FeaturedActivityCard;
