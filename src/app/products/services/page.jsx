import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined';
import ArticleOutlined from '@mui/icons-material/ArticleOutlined';
import BadgeOutlined from '@mui/icons-material/BadgeOutlined';
import CleaningServicesOutlined from '@mui/icons-material/CleaningServicesOutlined';
import DownloadOutlined from '@mui/icons-material/DownloadOutlined';
import DynamicFeedOutlined from '@mui/icons-material/DynamicFeedOutlined';
import FavoriteBorderOutlined from '@mui/icons-material/FavoriteBorderOutlined';
import FlagOutlined from '@mui/icons-material/FlagOutlined';
import FolderOutlined from '@mui/icons-material/FolderOutlined';
import HubOutlined from '@mui/icons-material/HubOutlined';
import InventoryOutlined from '@mui/icons-material/InventoryOutlined';
import KeyOutlined from '@mui/icons-material/KeyOutlined';
import LinkOutlined from '@mui/icons-material/LinkOutlined';
import MailOutlined from '@mui/icons-material/MailOutlined';
import MemoryOutlined from '@mui/icons-material/MemoryOutlined';
import NotificationsOutlined from '@mui/icons-material/NotificationsOutlined';
import PersonAddAltOutlined from '@mui/icons-material/PersonAddAltOutlined';
import PhotoOutlined from '@mui/icons-material/PhotoOutlined';
import PlaceOutlined from '@mui/icons-material/PlaceOutlined';
import RouterOutlined from '@mui/icons-material/RouterOutlined';
import RssFeedOutlined from '@mui/icons-material/RssFeedOutlined';
import SchemaOutlined from '@mui/icons-material/SchemaOutlined';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import ShareOutlined from '@mui/icons-material/ShareOutlined';
import StorageOutlined from '@mui/icons-material/StorageOutlined';
import SwapHorizOutlined from '@mui/icons-material/SwapHorizOutlined';
import TagOutlined from '@mui/icons-material/TagOutlined';
import UpgradeOutlined from '@mui/icons-material/UpgradeOutlined';
import VideocamOutlined from '@mui/icons-material/VideocamOutlined';
import WebOutlined from '@mui/icons-material/WebOutlined';
import Link from '../../../components/Link';
import PageHeader from '../../../components/PageHeader';
import Section from '../../../components/Section';
import { BlueskyMark } from '../../../components/diagrams/marks';
import { getSource } from '../../../lib/docs';
import { backing, groups } from '../../../data/services';

export const metadata = {
  title: 'Anahita Services',
  description: 'The server, one service at a time: what each does, and which an instance may leave out.',
};

const icons = {
  account: AccountCircleOutlined,
  article: ArticleOutlined,
  badge: BadgeOutlined,
  bluesky: BlueskyMark,
  database: StorageOutlined,
  download: DownloadOutlined,
  events: SwapHorizOutlined,
  feed: DynamicFeedOutlined,
  fediverse: HubOutlined,
  files: InventoryOutlined,
  flag: FlagOutlined,
  folder: FolderOutlined,
  key: KeyOutlined,
  like: FavoriteBorderOutlined,
  link: LinkOutlined,
  mail: MailOutlined,
  memory: MemoryOutlined,
  notifications: NotificationsOutlined,
  photo: PhotoOutlined,
  place: PlaceOutlined,
  router: RouterOutlined,
  rss: RssFeedOutlined,
  schema: SchemaOutlined,
  search: SearchOutlined,
  share: ShareOutlined,
  suggest: PersonAddAltOutlined,
  sweep: CleaningServicesOutlined,
  tag: TagOutlined,
  upgrade: UpgradeOutlined,
  video: VideocamOutlined,
  web: WebOutlined,
};

// The networks Anahita speaks to keep black or white, as in the diagrams.
const networks = new Set(['bluesky', 'fediverse']);

function ServiceIcon({ name }) {
  const Component = icons[name];
  const tone = networks.has(name)
    ? { color: 'common.black', '.dark &': { color: 'common.white' } }
    : { color: 'primary.main' };
  return (
    <Box
      sx={{
        width: 40,
        height: 40,
        flexShrink: 0,
        borderRadius: 2,
        display: 'grid',
        placeItems: 'center',
        bgcolor: 'action.hover',
      }}
    >
      <Component sx={{ fontSize: 22, ...tone }} />
    </Box>
  );
}

// One service: its icon, name and whether it is optional; what it is;
// then what it does that is worth knowing, each lead above its sentence.
// Alone in its row (alone in its group, or the last of an odd number), a
// card is `wide`: the full width, with its details in two columns.
function ServiceCard({ name, icon, text, details = [], optional, href, wide }) {
  return (
    <Card sx={{ height: '100%', p: { xs: 2.5, md: 3 } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <ServiceIcon name={icon} />
        <Box sx={{ minWidth: 0, flexGrow: 1 }}>
          <Typography
            variant="subtitle1"
            component="h3"
            sx={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: '1rem', fontWeight: 500, lineHeight: 1.3 }}
          >
            {href ? (
              <MuiLink component={Link} href={href} color="inherit" underline="hover">
                {name}
              </MuiLink>
            ) : (
              name
            )}
          </Typography>
        </Box>
        {optional && <Chip label="Optional" size="small" variant="outlined" />}
      </Box>
      <Typography variant="body1" sx={{ mt: 2 }}>
        {text}
      </Typography>
      {details.length > 0 && (
        <Box
          component="dl"
          sx={{ m: 0, mt: 2.5, display: 'grid', gap: 2, columnGap: 4, gridTemplateColumns: wide ? { md: '1fr 1fr' } : undefined }}
        >
          {details.map(([lead, line]) => (
            <Box key={lead}>
              <Typography component="dt" variant="body2" sx={{ fontWeight: 500 }}>
                {lead}
              </Typography>
              <Typography component="dd" variant="body2" color="text.secondary" sx={{ m: 0 }}>
                {line.charAt(0).toUpperCase() + line.slice(1)}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Card>
  );
}

export default function Services() {
  // Each service links to its page of the docs once those are on the site.
  const docs = Boolean(getSource('services'));

  return (
    <>
      <PageHeader
        parent={{ href: '/products/', label: 'Products' }}
        title="Anahita Services"
        subtitle="The server, one service at a time. Each does one thing, all are reached through one gateway, and the optional ones can be left out."
      />
      {groups.map(({ title, services }) => (
        <Section key={title} small title={title}>
          <Grid container spacing={2}>
            {services.map((service, index) => {
              const wide = services.length % 2 === 1 && index === services.length - 1;
              return (
                <Grid key={service.name} size={{ xs: 12, md: wide ? 12 : 6 }}>
                  <ServiceCard
                    wide={wide}
                    {...service}
                    href={docs && service.doc ? `/docs/services/${service.doc}/` : null}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Section>
      ))}
      <Section small title="Underneath" subtitle="What the services keep their data in. Each can be run by you, or bought as a managed service.">
        <Grid container spacing={2}>
          {backing.map(({ name, icon, text }) => (
            <Grid key={name} size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ height: '100%', p: 2.5 }}>
                <ServiceIcon name={icon} />
                <Typography variant="subtitle1" component="h3" sx={{ mt: 2, fontWeight: 500 }}>
                  {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {text}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Section>
    </>
  );
}
