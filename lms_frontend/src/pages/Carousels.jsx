import { Carousel, IconButton } from "@material-tailwind/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline"
 
export default function Carousels() {
  return (
    <Carousel
      className="rounded-xl z-0"
      prevArrow={({ handlePrev }) => (
        <IconButton
          variant="text"
          color="white"
          size="lg"
          onClick={handlePrev}
          className="!absolute top-2/4 -translate-y-2/4 left-4"
        >
          <ArrowLeftIcon strokeWidth={2} className="w-6 h-6" />
        </IconButton>
      )}
      nextArrow={({ handleNext }) => (
        <IconButton
          variant="text"
          color="white"
          size="lg"
          onClick={handleNext}
          className="!absolute top-2/4 -translate-y-2/4 !right-4"
        >
          <ArrowRightIcon strokeWidth={2} className="w-6 h-6" />
        </IconButton>
      )}
    >
      <img
        // src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
        src="https://img.freepik.com/free-photo/hands-working-digital-device-network-graphic-overlay_53876-138487.jpg?w=1060&t=st=1693466310~exp=1693466910~hmac=aa50f69be77b11fd435b0b9cb919088dd3037c9779cd677ff8aecf32c0c3e267"
        alt="img 1"
        className="h-5/6 w-full object-cover"
      />
      <img
        src="https://img.freepik.com/free-photo/plan-graph-knowledge-steps_53876-120130.jpg?w=1060&t=st=1693466356~exp=1693466956~hmac=f2d007fb67160d8b245f3af845966b2137ec5cd9796bfb26eb8a20635f6c74b4"
        alt="img 2"
        className="h-full w-full object-cover "
      />
      <img
        src="https://img.freepik.com/free-vector/online-tutorials-concept_52683-37481.jpg?w=1060&t=st=1693466939~exp=1693467539~hmac=08fee1f71a777de3ed631917eb975ac03cd0e2a36ca4edec4415862bafc4500a"
        alt="img 3"
        className="h-5/6 w-full object-cover object-fit"
      />
    </Carousel>
  );
}