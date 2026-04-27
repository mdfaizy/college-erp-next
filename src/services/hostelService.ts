import { apiConnector } from "./apiConncetor";

export const createHostel = async (data: any) => {
  return apiConnector("POST", "/hostel/create-hostel", data);
};

export const createFloor = async (data: any) => {
  return apiConnector("POST", "/hostel/create-floor", data);
};


export const createRoom = async (data: any) => {
  return apiConnector("POST", "/hostel/create-room", data);
};

export const getHostels = async () => {
  return apiConnector("GET", "/hostel/list");
};
export const assignHostel = async (data: any) => {
  return apiConnector("POST", "/hostel/assign", data);
};

export const transferHostel = async (data: any) => {
  return apiConnector("POST", "/hostel/transfer", data);
};

export const getAllocations = async () => {
  return apiConnector("GET", "/hostel/allocations");
};

export const getTransferHistory = async () => {
  return apiConnector("GET", "/hostel/history");
};

export const getFloorsByHostel = async (
  hostelId: number
) => {
  return apiConnector(
    "GET",
    `/hostel/floors/${hostelId}`
  );
};
export const getRooms = async () => {
  return apiConnector("GET", "/hostel/rooms");
};

export const getAllHostels = async () => {
  return apiConnector("GET", "/hostel/list");
};

export const toggleHostel = async (
  id: number
) => {
  return apiConnector(
    "PATCH",
    `/hostel/toggle/${id}`
  );
};

export const deleteHostel = async (
  id: number
) => {
  return apiConnector(
    "DELETE",
    `/hostel/delete/${id}`
  );
};

export const getRoomsByFloor = async (
  floorId: number
) => {
  return apiConnector(
    "GET",
    `/hostel/rooms-by-floor/${floorId}`
  );
};

export const getFloors = async () => {
  return apiConnector("GET", "/hostel/floors");
};

export const toggleFloor = async (
  id: number
) => {
  return apiConnector(
    "PATCH",
    `/hostel/floor-toggle/${id}`
  );
};

export const deleteFloor = async (
  id: number
) => {
  return apiConnector(
    "DELETE",
    `/hostel/floor-delete/${id}`
  );
};


export const getStudentAllocation = async (
  studentId: number
) => {
  return apiConnector(
    "GET",
    `/hostel/my-allocation/${studentId}`
  );
};


export const getFilteredAllocations =
  async (
    hostelId?: number,
    roomId?: number
  ) => {
    let url =
      "/hostel/allocation-filter?";

    if (hostelId) {
      url += `hostelId=${hostelId}&`;
    }

    if (roomId) {
      url += `roomId=${roomId}`;
    }

    return apiConnector(
      "GET",
      url
    );
  };
