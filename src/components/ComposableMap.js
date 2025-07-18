import React, { forwardRef } from "react"
import PropTypes from "prop-types"

import { MapProvider } from "./MapProvider"

const ComposableMap = forwardRef(
  (
    {
      width = 800,
      height = 600,
      projection = "geoEqualEarth",
      projectionConfig = {},
      className = "",
      ...restProps
    },
    ref
  ) => {
    // Handle responsive dimensions
    const numericWidth = typeof width === 'number' ? width : 800
    const numericHeight = typeof height === 'number' ? height : 600
    
    return (
      <MapProvider
        width={numericWidth}
        height={numericHeight}
        projection={projection}
        projectionConfig={projectionConfig}
      >
        <svg
          ref={ref}
          width={width}
          height={height}
          viewBox={`0 0 ${numericWidth} ${numericHeight}`}
          className={`rsm-svg ${className}`}
          {...restProps}
        />
      </MapProvider>
    )
  }
)

ComposableMap.displayName = "ComposableMap"

ComposableMap.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  projection: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  projectionConfig: PropTypes.object,
  className: PropTypes.string,
}

export default ComposableMap
