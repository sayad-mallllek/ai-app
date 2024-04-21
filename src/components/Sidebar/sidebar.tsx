import MessageIcon from "../message-icon";
import SidebarIcon from "../sidebar-icon";

interface Props {}

const Sidebar = ({}: Props) => {
  return (
    <div className="fixed left-0 h-full overflow-auto min-w-6 p-4 bg-white dark:bg-slate-900 flex flex-col gap-4">
      <button className="transition-colors hover:bg-gray-200 dark:hover:bg-gray-600 p-1 rounded-lg">
        <SidebarIcon className="text-lg [&_path]:fill-blue-500" />
      </button>
      <button className="transition-colors hover:bg-gray-200 dark:hover:bg-gray-600 p-1 rounded-lg">
        <MessageIcon className="text-lg [&_path]:fill-blue-500" />
      </button>
    </div>
  );
};

export default Sidebar;
