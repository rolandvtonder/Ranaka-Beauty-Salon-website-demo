import {Shell} from './components/Shell';
import {About} from './pages/About';
import {Contact} from './pages/Contact';
import {Gallery} from './pages/Gallery';
import {Home} from './pages/Home';
import {Services} from './pages/Services';
import {pages, type PageKey} from './seo';

const views: Record<PageKey, () => React.JSX.Element> = {home: Home, services: Services, gallery: Gallery, about: About, contact: Contact};

export default function App({page}: {page: PageKey}) {
  const View = views[page] ?? Home;
  return (
    <Shell current={pages[page].path}>
      <View />
    </Shell>
  );
}
