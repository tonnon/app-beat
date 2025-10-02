export type { IconBaseProps } from 'react-icons';
export {
  RiArrowRightLine as ArrowRightIcon,
} from 'react-icons/ri';
export {
  MdOutlineChecklistRtl as ChecklistIcon,
  MdOutlineComment as CommentIcon,
} from "react-icons/md";
export {
  IoSchoolOutline as EducationIcon,
} from "react-icons/io5";
export {
  PiHeadCircuit as HeadCircuitIcon
} from "react-icons/pi";
export {
  VscGraph as GraphIcon
} from "react-icons/vsc";

export const IconSizes = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  '2xl': 48
} as const;

export type IconSize = keyof typeof IconSizes | number;

export const getIconSize = (size: IconSize): number => {
  if (typeof size === 'number') return size;
  return IconSizes[size];
};

export const defaultIconProps = {
  size: IconSizes.md,
  'aria-hidden': true,
} as const;