const Sidebar = (props: any) => {
  return (
    <div className={`Sidebar ${props.isSidebarOpen ? "" : "hide"}`}>
      Sidebar
    </div>
  );
};

export default Sidebar;
