// Utility functions for filtering data

export const filterPhuHuynh = (phuHuynhList, filters) => {
  if (!phuHuynhList || phuHuynhList.length === 0) return [];

  const result = phuHuynhList.filter(phuHuynh => {
    // Filter by name
    if (filters.phuHuynh.ten && !phuHuynh.ten_phu_huynh?.toLowerCase().includes(filters.phuHuynh.ten.toLowerCase())) {
      return false;
    }

    // Filter by email
    if (filters.phuHuynh.email && !phuHuynh.email_phu_huynh?.toLowerCase().includes(filters.phuHuynh.email.toLowerCase())) {
      return false;
    }

    // Filter by phone
    if (filters.phuHuynh.sdt && !phuHuynh.sdt?.includes(filters.phuHuynh.sdt)) {
      return false;
    }

    // Filter by account type
    if (filters.phuHuynh.loaiTaiKhoan) {
      const isPremium = isPremiumUser(phuHuynh);
      if (filters.phuHuynh.loaiTaiKhoan === 'Premium' && !isPremium) {
        return false;
      }
      if (filters.phuHuynh.loaiTaiKhoan === 'Free' && isPremium) {
        return false;
      }
    }

    return true;
  });


  return result;
};

export const filterTreEm = (treEmList, filters) => {
  if (!treEmList || treEmList.length === 0) return [];

  const result = treEmList.filter(treEm => {
    // Filter by name
    if (filters.treEm.ten && !treEm.ten_tre?.toLowerCase().includes(filters.treEm.ten.toLowerCase())) {
      return false;
    }

    // Filter by class - exact match
    if (filters.treEm.lop && treEm.lop !== filters.treEm.lop) {
      return false;
    }

    // Filter by school type - exact match
    if (filters.treEm.truong && treEm.truong !== filters.treEm.truong) {
      return false;
    }

    return true;
  });


  return result;
};

export const filterThietBi = (thietBiList, filters) => {
  if (!thietBiList || thietBiList.length === 0) return [];

  return thietBiList.filter(thietBi => {
    // Filter by device code
    if (filters.thietBi.maThietBi && !thietBi.ma_thiet_bi?.toLowerCase().includes(filters.thietBi.maThietBi.toLowerCase())) {
      return false;
    }

    // Filter by device name
    if (filters.thietBi.tenThietBi && !thietBi.ten_thiet_bi?.toLowerCase().includes(filters.thietBi.tenThietBi.toLowerCase())) {
      return false;
    }

    // Filter by device type
    if (filters.thietBi.loaiThietBi && thietBi.loai_thiet_bi !== filters.thietBi.loaiThietBi) {
      return false;
    }

    // Filter by service package
    if (filters.thietBi.goiDichVu) {
      const activeGoi = getActiveGoi(thietBi);
      if (filters.thietBi.goiDichVu === 'CHUA_CO_GOI' && activeGoi) {
        return false;
      }
      if (filters.thietBi.goiDichVu !== 'CHUA_CO_GOI') {
        if (!activeGoi || !activeGoi.thongTinGoi) {
          return false;
        }
        // Check if package name matches
        if (!activeGoi.thongTinGoi.ten?.toLowerCase().includes(filters.thietBi.goiDichVu.toLowerCase())) {
          return false;
        }
      }
    }

    return true;
  });
};

// Helper functions
export const isPremiumUser = (phuHuynh) => {
  if (!phuHuynh.treEmList) return false;
  
  return phuHuynh.treEmList.some(treEm => 
    treEm.thietBiList && treEm.thietBiList.some(thietBi => 
      thietBi.goiDichVuList && thietBi.goiDichVuList.some(goi => 
        goi.trang_thai === 'DANG_HOAT_DONG' && 
        goi.thongTinGoi && 
        goi.thongTinGoi.loai_goi === 'TRA_PHI'
      )
    )
  );
};

export const getActiveGoi = (thietBi) => {
  if (thietBi.goiDichVuList && thietBi.goiDichVuList.length > 0) {
    const activeGoi = thietBi.goiDichVuList.find(goi => goi.trang_thai === 'DANG_HOAT_DONG');
    // Kiểm tra xem thongTinGoi có tồn tại không (không bị xóa hoặc thong_tin_goi_id = null)
    if (activeGoi && activeGoi.thongTinGoi && activeGoi.thong_tin_goi_id) {
      return activeGoi;
    }
  }
  return null;
};

// Main filter function that applies all filters
export const applyFilters = (phuHuynhList, filters) => {
  if (!filters || Object.values(filters).every(category => 
    Object.values(category).every(value => value === '')
  )) {
    return phuHuynhList; // No filters applied
  }

  // Check which filter categories have active filters
  const hasParentFilters = Object.values(filters.phuHuynh).some(value => value !== '');
  const hasChildFilters = Object.values(filters.treEm).some(value => value !== '');
  const hasDeviceFilters = Object.values(filters.thietBi).some(value => value !== '');

  console.log('Filter conditions:', { hasParentFilters, hasChildFilters, hasDeviceFilters });

  return phuHuynhList.map(phuHuynh => {
    let shouldIncludeParent = false;
    let filteredTreEmList = phuHuynh.treEmList || [];

    // NEW LOGIC: Check all conditions together
    // If multiple filter types are active, ALL must match
    
    // 1. Check parent match (if parent filters are active)
    const parentMatches = hasParentFilters ? filterPhuHuynh([phuHuynh], filters).length > 0 : true;
    
    // 2. Check children match (if child filters are active)
    let childrenMatch = true;
    if (hasChildFilters) {
      const matchingChildren = phuHuynh.treEmList ? 
        phuHuynh.treEmList.filter(treEm => filterTreEm([treEm], filters).length > 0) : [];
      childrenMatch = matchingChildren.length > 0;
      
      if (childrenMatch) {
        // Filter children based on child filters
        filteredTreEmList = matchingChildren.map(treEm => {
          // 3. Check devices match (if device filters are active)
          let devicesMatch = true;
          let filteredThietBiList = treEm.thietBiList || [];
          
          if (hasDeviceFilters) {
            const matchingDevices = filterThietBi(treEm.thietBiList || [], filters);
            devicesMatch = matchingDevices.length > 0;
            filteredThietBiList = matchingDevices;
            console.log(`Child ${treEm.ten_tre}: ${treEm.thietBiList?.length || 0} devices, ${matchingDevices.length} match device filters`);
          }
          
          // Only include child if devices also match (when device filters are active)
          if (hasDeviceFilters && !devicesMatch) {
            return null;
          }
          
          return {
            ...treEm,
            thietBiList: filteredThietBiList
          };
        }).filter(child => child !== null);
        
        // If device filters are active, check if any children have matching devices
        if (hasDeviceFilters && filteredTreEmList.length === 0) {
          childrenMatch = false;
          console.log(`❌ No children with matching devices for parent ${phuHuynh.ten_phu_huynh}`);
        }
      }
    } else if (hasDeviceFilters) {
      // If only device filters are active, check devices across all children
      const childrenWithMatchingDevices = phuHuynh.treEmList ? 
        phuHuynh.treEmList.map(treEm => {
          const matchingDevices = filterThietBi(treEm.thietBiList || [], filters);
          if (matchingDevices.length > 0) {
            return {
              ...treEm,
              thietBiList: matchingDevices
            };
          }
          return null;
        }).filter(child => child !== null) : [];
      
      childrenMatch = childrenWithMatchingDevices.length > 0;
      filteredTreEmList = childrenWithMatchingDevices;
    }

    // Final decision: include parent only if ALL active conditions match
    shouldIncludeParent = parentMatches && childrenMatch;
    
    if (shouldIncludeParent) {
      console.log(`✅ Including parent ${phuHuynh.ten_phu_huynh} - all conditions match`);
      return {
        ...phuHuynh,
        treEmList: filteredTreEmList
      };
    } else {
      console.log(`❌ Excluding parent ${phuHuynh.ten_phu_huynh} - conditions not met:`, {
        parentMatches,
        childrenMatch,
        hasParentFilters,
        hasChildFilters,
        hasDeviceFilters
      });
      return null;
    }
  }).filter(phuHuynh => phuHuynh !== null);
};

// Get filter statistics
export const getFilterStats = (phuHuynhList, filters) => {
  const filtered = applyFilters(phuHuynhList, filters);
  
  const totalPhuHuynh = filtered.length;
  const totalTreEm = filtered.reduce((sum, phuHuynh) => sum + (phuHuynh.treEmList?.length || 0), 0);
  const totalThietBi = filtered.reduce((sum, phuHuynh) => 
    sum + (phuHuynh.treEmList?.reduce((childSum, treEm) => 
      childSum + (treEm.thietBiList?.length || 0), 0) || 0), 0);

  return {
    totalPhuHuynh,
    totalTreEm,
    totalThietBi,
    hasFilters: Object.values(filters).some(category => 
      Object.values(category).some(value => value !== '')
    )
  };
};

// Get detailed filter results for display
export const getFilterResults = (phuHuynhList, filters) => {
  const filtered = applyFilters(phuHuynhList, filters);
  
  const results = {
    phuHuynh: [],
    treEm: [],
    thietBi: []
  };

  filtered.forEach(phuHuynh => {
    // Add parent
    results.phuHuynh.push(phuHuynh);
    
    // Add children
    if (phuHuynh.treEmList) {
      phuHuynh.treEmList.forEach(treEm => {
        results.treEm.push(treEm);
        
        // Add devices
        if (treEm.thietBiList) {
          treEm.thietBiList.forEach(thietBi => {
            results.thietBi.push(thietBi);
          });
        }
      });
    }
  });

  return results;
};
