export const risksLoadRoutes = async () => {
    let components = [];
    try {
      let { AppShared } = await import("@4eplatform/shared");
      components.push(AppShared);
    } catch (error) {
      console.error("Error loading shared:", error);
    }
    
    try {
      let { Visitor } = await import("@4eplatform/visitor");
      components.push(Visitor);
    } catch (error) {
      console.error("Error loading risks:", error);
    }
   
      try {
      let { Connect } = await import("@4eplatform/connect");
      components.push(Connect);
    } catch (error) {
      console.error("Error loading connect:", error);
    }
    
    return components;
};
