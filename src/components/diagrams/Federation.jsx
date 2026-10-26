import Box from '@mui/material/Box';
import DnsOutlined from '@mui/icons-material/DnsOutlined';
import { BlueskyMark } from './marks';
import { Caption, Diagram, Link, Node, Overline } from './parts';

const label =
  'On the fediverse, your instance is a server among servers such as mastodon.social and pixelfed.social. On Bluesky it is an app, for whoever connects their own account. Only public posts go out, and only for those who turn it on.';

function Wide() {
  return (
    <Diagram label={label} viewBox="0 0 960 300">
      <Overline x={0} y={24}>THE FEDIVERSE · AS A SERVER</Overline>
      <Node x={0} y={40} w={220} h={56} title="mastodon.social" lines={['Mastodon']} />
      <Node x={0} y={122} w={220} h={56} title="pixelfed.social" lines={['Pixelfed']} />
      <Node x={0} y={204} w={220} h={56} title="Any fediverse server" lines={['GoToSocial, Akkoma…']} />
      <Link d="M220 68 C300 68 290 150 366 150" both />
      <Link d="M220 150 L366 150" both />
      <Link d="M220 232 C300 232 290 150 366 150" both />

      <Overline x={480} y={80} anchor="middle">YOUR INSTANCE</Overline>
      <Node x={370} y={92} w={220} h={116} accent icon={DnsOutlined} title="your-school.example" lines={['Anahita Services', '@ana@your-school.example']} />

      <Overline x={740} y={24}>BLUESKY · AS AN APP</Overline>
      <Link d="M590 150 L736 150" both dashed />
      <Caption x={663} y={176} size={12}>for who connects it</Caption>
      <Node x={740} y={122} w={220} h={56} icon={BlueskyMark} mark title="Bluesky" lines={['their own account']} />

      <Caption x={480} y={286}>Only public posts, and only for those who turn it on.</Caption>
    </Diagram>
  );
}

function Narrow() {
  return (
    <Diagram label={label} viewBox="0 0 360 540">
      <Overline x={0} y={20}>THE FEDIVERSE · AS A SERVER</Overline>
      <Node x={0} y={32} w={170} h={56} title="mastodon.social" lines={['Mastodon']} size={14} />
      <Node x={190} y={32} w={170} h={56} title="pixelfed.social" lines={['Pixelfed']} size={14} />
      <Node x={0} y={100} w={360} h={52} title="Any fediverse server" lines={['GoToSocial, Akkoma…']} size={14} />
      <Link d="M180 152 L180 206" both />

      <Overline x={40} y={198}>YOUR INSTANCE</Overline>
      <Node x={40} y={210} w={280} h={110} accent icon={DnsOutlined} title="your-school.example" lines={['Anahita Services', '@ana@your-school.example']} size={14} />

      <Link d="M180 320 L180 390" both dashed />
      <Caption x={192} y={360} anchor="start" size={12}>for who connects it</Caption>
      <Overline x={0} y={384}>BLUESKY · AS AN APP</Overline>
      <Node x={60} y={394} w={240} h={56} icon={BlueskyMark} mark title="Bluesky" lines={['their own account']} size={14} />

      <Caption x={180} y={490}>Only public posts, and only</Caption>
      <Caption x={180} y={508}>for those who turn it on.</Caption>
    </Diagram>
  );
}

// How an instance takes part: a server on the fediverse, an app on Bluesky.
export default function Federation() {
  return (
    <Box data-pagefind-ignore>
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <Wide />
      </Box>
      <Box sx={{ display: { md: 'none' }, maxWidth: 400 }}>
        <Narrow />
      </Box>
    </Box>
  );
}
