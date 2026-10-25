import AccountTreeOutlined from '@mui/icons-material/AccountTreeOutlined';
import ApiOutlined from '@mui/icons-material/ApiOutlined';
import ArticleOutlined from '@mui/icons-material/ArticleOutlined';
import BrushOutlined from '@mui/icons-material/BrushOutlined';
import BusinessCenterOutlined from '@mui/icons-material/BusinessCenterOutlined';
import CodeOutlined from '@mui/icons-material/CodeOutlined';
import DescriptionOutlined from '@mui/icons-material/DescriptionOutlined';
import DynamicFeedOutlined from '@mui/icons-material/DynamicFeedOutlined';
import EventOutlined from '@mui/icons-material/EventOutlined';
import FavoriteBorderOutlined from '@mui/icons-material/FavoriteBorderOutlined';
import GitHub from '@mui/icons-material/GitHub';
import GroupsOutlined from '@mui/icons-material/GroupsOutlined';
import HomeOutlined from '@mui/icons-material/HomeOutlined';
import HubOutlined from '@mui/icons-material/HubOutlined';
import InstallDesktopOutlined from '@mui/icons-material/InstallDesktopOutlined';
import LanguageOutlined from '@mui/icons-material/LanguageOutlined';
import ManageHistoryOutlined from '@mui/icons-material/ManageHistoryOutlined';
import PersonOutlined from '@mui/icons-material/PersonOutlined';
import PhoneIphoneOutlined from '@mui/icons-material/PhoneIphoneOutlined';
import PhotoOutlined from '@mui/icons-material/PhotoOutlined';
import PlayCircleOutlined from '@mui/icons-material/PlayCircleOutlined';
import SettingsOutlined from '@mui/icons-material/SettingsOutlined';
import SmartToyOutlined from '@mui/icons-material/SmartToyOutlined';
import SpaOutlined from '@mui/icons-material/SpaOutlined';
import TerminalOutlined from '@mui/icons-material/TerminalOutlined';
import TuneOutlined from '@mui/icons-material/TuneOutlined';
import VideocamOutlined from '@mui/icons-material/VideocamOutlined';
import VolunteerActivismOutlined from '@mui/icons-material/VolunteerActivismOutlined';

// The icons the site's words name in src/data/, so the data stays plain.
const icons = {
  account_tree: AccountTreeOutlined,
  api: ApiOutlined,
  article: ArticleOutlined,
  brush: BrushOutlined,
  business: BusinessCenterOutlined,
  code: CodeOutlined,
  description: DescriptionOutlined,
  event: EventOutlined,
  favorite: FavoriteBorderOutlined,
  feed: DynamicFeedOutlined,
  github: GitHub,
  groups: GroupsOutlined,
  home: HomeOutlined,
  hub: HubOutlined,
  install: InstallDesktopOutlined,
  manage: ManageHistoryOutlined,
  person: PersonOutlined,
  phone: PhoneIphoneOutlined,
  photo: PhotoOutlined,
  play: PlayCircleOutlined,
  settings: SettingsOutlined,
  smart_toy: SmartToyOutlined,
  spa: SpaOutlined,
  terminal: TerminalOutlined,
  tune: TuneOutlined,
  video: VideocamOutlined,
  volunteer: VolunteerActivismOutlined,
  website: LanguageOutlined,
};

export default function Icon({ name }) {
  const Component = icons[name];
  return <Component color="primary" />;
}
