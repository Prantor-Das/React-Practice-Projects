import RightCardContent from "./RightCardContent";

const RightCard = (props) => {
  console.log(props.color);

  return (
    <div className="h-full shrink-0 overflow-hidden w-80 relative rounded-4xl">
      <img className="h-full w-full object-cover relative" src={props.img} alt="" />
      <span className="absolute inset-0 bg-linear-to-t from-black to-transparent z-10"></span>
      <RightCardContent color={props.color} id={props.id} tag={props.tag} />
    </div>
  );
};

export default RightCard;
