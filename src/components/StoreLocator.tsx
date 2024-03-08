// src/components/StoreLocator.tsx

import * as React from "react";
import { useEffect } from "react";
import {
  MapboxMap,
  FilterSearch,
  OnSelectParams,
  VerticalResults,
} from "@yext/search-ui-react";
import {
  Matcher,
  SelectableStaticFilter,
  useSearchActions,
} from "@yext/search-headless-react";
// Mapbox CSS bundle
import "mapbox-gl/dist/mapbox-gl.css";
import LocationCard from "./LocationCard";               // New
import MapPin from "./MapPin";

const StoreLocator = (): JSX.Element => {
  const searchActions = useSearchActions();

  useEffect(() => {
    searchActions.setVertical("locations");
  }, []);

  const handleFilterSelect = (params: OnSelectParams) => {
    const locationFilter: SelectableStaticFilter = {
      displayName: params.newDisplayName,
      selected: true,
      filter: {
        kind: "fieldValue",
        fieldId: params.newFilter.fieldId,
        value: params.newFilter.value,
        matcher: Matcher.Equals,
      },
    };
    searchActions.setStaticFilters([locationFilter]);
    searchActions.executeVerticalQuery();
  };

  return (
    <>
      <div className="flex h-[calc(100vh-242px)] border">
        <div className="w-1/3 flex flex-col">
          <FilterSearch
            onSelect={handleFilterSelect}
            placeholder="Find Locations Near You"
            searchFields={[
              {
                entityType: "location",
                fieldApiName: "builtin.location",
              },
            ]}
          />
          <VerticalResults
            customCssClasses={{ verticalResultsContainer: "overflow-y-auto" }}
            CardComponent={LocationCard}   // New           
          />
        </div>
        <div className="w-2/3">
          <MapboxMap
            mapboxAccessToken={YEXT_PUBLIC_MAPBOX_API_KEY || ""}
            PinComponent={MapPin}          // New
          />
        </div>
      </div>
     </>
  );
};

export default StoreLocator;