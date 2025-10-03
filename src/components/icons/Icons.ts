export type { IconBaseProps } from 'react-icons';

export {
  MdOutlineChecklistRtl as ChecklistIcon,
  MdOutlineComment as CommentIcon,
} from 'react-icons/md';

export {
  IoSchoolOutline as EducationIcon,
  IoSettingsOutline as SettingsIcon
} from 'react-icons/io5';

export {
  PiHeadCircuit as HeadCircuitIcon,
} from 'react-icons/pi';

export {
  VscGraph as GraphIcon,
} from 'react-icons/vsc';

export {
  FaUserAlt as UserIcon,
  FaRegStar as StarIcon,
  FaPen as PenIcon
} from 'react-icons/fa';

export { 
  AiOutlineLogout as LogoutIcon
} from "react-icons/ai";

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