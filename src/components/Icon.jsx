import AccountTreeOutlined from '@mui/icons-material/AccountTreeOutlined';
import ApiOutlined from '@mui/icons-material/ApiOutlined';
import ArticleOutlined from '@mui/icons-material/ArticleOutlined';
import BookmarkBorderOutlined from '@mui/icons-material/BookmarkBorderOutlined';
import BrushOutlined from '@mui/icons-material/BrushOutlined';
import BusinessCenterOutlined from '@mui/icons-material/BusinessCenterOutlined';
import CodeOutlined from '@mui/icons-material/CodeOutlined';
import DescriptionOutlined from '@mui/icons-material/DescriptionOutlined';
import DownloadOutlined from '@mui/icons-material/DownloadOutlined';
import DynamicFeedOutlined from '@mui/icons-material/DynamicFeedOutlined';
import EventOutlined from '@mui/icons-material/EventOutlined';
import ExploreOutlined from '@mui/icons-material/ExploreOutlined';
import FavoriteBorderOutlined from '@mui/icons-material/FavoriteBorderOutlined';
import FingerprintOutlined from '@mui/icons-material/FingerprintOutlined';
import FlagOutlined from '@mui/icons-material/FlagOutlined';
import GitHub from '@mui/icons-material/GitHub';
import GroupsOutlined from '@mui/icons-material/GroupsOutlined';
import HomeOutlined from '@mui/icons-material/HomeOutlined';
import HubOutlined from '@mui/icons-material/HubOutlined';
import InstallDesktopOutlined from '@mui/icons-material/InstallDesktopOutlined';
import LanguageOutlined from '@mui/icons-material/LanguageOutlined';
import LocalOfferOutlined from '@mui/icons-material/LocalOfferOutlined';
import ManageHistoryOutlined from '@mui/icons-material/ManageHistoryOutlined';
import NotificationsOutlined from '@mui/icons-material/NotificationsOutlined';
import PersonOutlined from '@mui/icons-material/PersonOutlined';
import PhoneIphoneOutlined from '@mui/icons-material/PhoneIphoneOutlined';
import PhotoOutlined from '@mui/icons-material/PhotoOutlined';
import PlaceOutlined from '@mui/icons-material/PlaceOutlined';
import PlayCircleOutlined from '@mui/icons-material/PlayCircleOutlined';
import RssFeedOutlined from '@mui/icons-material/RssFeedOutlined';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import SettingsOutlined from '@mui/icons-material/SettingsOutlined';
import SmartToyOutlined from '@mui/icons-material/SmartToyOutlined';
import SpaOutlined from '@mui/icons-material/SpaOutlined';
import TagOutlined from '@mui/icons-material/TagOutlined';
import TerminalOutlined from '@mui/icons-material/TerminalOutlined';
import TuneOutlined from '@mui/icons-material/TuneOutlined';
import VideocamOutlined from '@mui/icons-material/VideocamOutlined';
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined';
import VolunteerActivismOutlined from '@mui/icons-material/VolunteerActivismOutlined';

// The icons the site's words name in src/data/, so the data stays plain.
const icons = {
  account_tree: AccountTreeOutlined,
  api: ApiOutlined,
  article: ArticleOutlined,
  bookmark: BookmarkBorderOutlined,
  brush: BrushOutlined,
  business: BusinessCenterOutlined,
  code: CodeOutlined,
  description: DescriptionOutlined,
  download: DownloadOutlined,
  event: EventOutlined,
  explore: ExploreOutlined,
  favorite: FavoriteBorderOutlined,
  feed: DynamicFeedOutlined,
  fingerprint: FingerprintOutlined,
  flag: FlagOutlined,
  github: GitHub,
  groups: GroupsOutlined,
  home: HomeOutlined,
  hub: HubOutlined,
  install: InstallDesktopOutlined,
  label: LocalOfferOutlined,
  manage: ManageHistoryOutlined,
  notifications: NotificationsOutlined,
  person: PersonOutlined,
  phone: PhoneIphoneOutlined,
  photo: PhotoOutlined,
  place: PlaceOutlined,
  play: PlayCircleOutlined,
  rss: RssFeedOutlined,
  search: SearchOutlined,
  settings: SettingsOutlined,
  smart_toy: SmartToyOutlined,
  spa: SpaOutlined,
  tag: TagOutlined,
  terminal: TerminalOutlined,
  tune: TuneOutlined,
  video: VideocamOutlined,
  visibility: VisibilityOutlined,
  volunteer: VolunteerActivismOutlined,
  website: LanguageOutlined,
};

export default function Icon({ name, sx }) {
  const Component = icons[name];
  return <Component color="primary" sx={sx} />;
}
