import type { ParentComponent } from 'solid-js';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const MainLayout: ParentComponent = (props) => {
  return (
    <div class="min-h-screen bg-gray-50">
      <Sidebar />
      <main class="ml-64 flex flex-col min-h-screen">
        <Header />
        <div class="flex-1 p-6">
          {props.children}
        </div>
      </main>
    </div>
  );
};
