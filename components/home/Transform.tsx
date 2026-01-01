import { Button } from "../ui/button";
import Typography from "../ui/Typography";

const Transform = () => {
  return (
    <section className="lg:py-[115px] py-[41px]">
      <div className="max-w-[px] mx-auto px-6">
        <div className="text-center w-fit mx-auto">
          <Typography.H1 className="capitalize">
            Ready to transform
            <br />
            <span className="bg-linear-to-r from-[#FF73C3] via-[#7B71FF] to-[#0EC9E2] bg-clip-text text-transparent">
              Your AI content?
            </span>
          </Typography.H1>
        </div>

        <div className="max-w-[546px] text-center mx-auto mt-4">
          <Typography.P>
            Join the community of creators using Altohuman to make their content
            more authentic and engaging
          </Typography.P>
        </div>

        <div className="flex justify-center mt-6">
          <Button className="bg-black rounded-full text-white">Humanize</Button>
        </div>
      </div>
    </section>
  );
};

export default Transform;
