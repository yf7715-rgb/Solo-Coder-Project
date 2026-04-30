import type { ParentComponent } from 'solid-js';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const MainLayout: ParentComponent = (props) => {
  return (
    <div class="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main class="flex-1 flex flex-col">
        <Header />
        <div class="flex-1 p-6 overflow-auto">
          {props.children}
        </div>
      </main>
    </div>
  );
};
