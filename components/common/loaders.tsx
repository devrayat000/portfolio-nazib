export const ExperienceLoader = () => {
  return [1, 2, 3].map((i) => (
    <div key={i} className="py-10 px-4">
      <div className="animate-pulse">
        <div className="flex gap-4">
          <div className="w-[150px] h-[150px] bg-slate-800" />
          <div className="flex flex-col gap-3 w-full">
            <h3 className="font-semibold h-7 bg-slate-800" />
            <h4 className="font-semibold h-7 bg-slate-800" />
            <h6 className="font-semibold h-7 bg-slate-800" />
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <p key={i} className="h-3 bg-slate-800" />
          ))}
        </div>
      </div>
    </div>
  ));
};

export const SkillLoader = () => {
  return [1, 2, 3, 4].map((i) => (
    <div key={i}>
      <div className="animate-pulse">
        <div className="w-full aspect-video rounded bg-slate-800" />
        <h3 className="mt-3 h-7 bg-slate-800" />
        <div className="mt-2 flex flex-col gap-1">
          {[1, 2, 3, 4].map((i) => (
            <p key={i} className="h-3 bg-slate-800" />
          ))}
        </div>
      </div>
    </div>
  ));
};
