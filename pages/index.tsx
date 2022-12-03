'use client';
import React from "react";

import {data, columns} from "../components/Table/ApiData";
import CustomTable from "../components/Table/CutsomTable";


function PageHome() {
   const COLUMNS = React.useMemo(() => columns, []);

  const DATA = React.useMemo(() => data(250), []);
  
  return <CustomTable columns={COLUMNS} data={DATA} />;
}

export default PageHome;
