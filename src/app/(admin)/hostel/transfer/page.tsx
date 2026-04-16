"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  transferHostel,
  getHostels,
  getFloorsByHostel,
  getRoomsByFloor,
  getStudentAllocation,
} from "@/services/hostelService";

import { getStudents } from "@/services/studentService";

import Select from "@/components/form/Select";
import Label from "@/components/form/Label";
import Form from "@/components/form/Form";
import TextArea from "@/components/form/input/TextArea";

export default function TransferHostelPage() {
  const [students, setStudents] =
    useState<any[]>([]);

  const [hostels, setHostels] =
    useState<any[]>([]);

  const [floors, setFloors] =
    useState<any[]>([]);

  const [rooms, setRooms] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [currentAllocation, setCurrentAllocation] =
    useState<any>(null);

  const [form, setForm] = useState({
    studentId: "",
    hostelId: "",
    floorId: "",
    newRoomId: "",
    reason: "",
  });

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    const [studentRes, hostelRes] =
      await Promise.all([
        getStudents(),
        getHostels(),
      ]);

    setStudents(
      studentRes.data.map(
        (student: any) => ({
          label: `${student.user?.name} (${student.id})`,
          value: String(student.id),
        })
      )
    );

    setHostels(
      hostelRes.data.map(
        (hostel: any) => ({
          label: hostel.name,
          value: String(hostel.id),
        })
      )
    );
  };

  const handleStudentChange =
    async (studentId: string) => {
      setForm({
        studentId,
        hostelId: "",
        floorId: "",
        newRoomId: "",
        reason: "",
      });

      setFloors([]);
      setRooms([]);

      const res =
        await getStudentAllocation(
          Number(studentId)
        );

      setCurrentAllocation(
        res.data || null
      );
    };

  const handleHostelChange =
    async (hostelId: string) => {
      setForm((prev) => ({
        ...prev,
        hostelId,
        floorId: "",
        newRoomId: "",
      }));

      const res =
        await getFloorsByHostel(
          Number(hostelId)
        );

      setFloors(
        res.data.map((floor: any) => ({
          label: floor.name,
          value: String(floor.id),
        }))
      );

      setRooms([]);
    };

  const handleFloorChange =
    async (floorId: string) => {
      setForm((prev) => ({
        ...prev,
        floorId,
        newRoomId: "",
      }));

      const res =
        await getRoomsByFloor(
          Number(floorId)
        );

      setRooms(
        res.data.map((room: any) => ({
          label: `${room.roomNumber} (Available: ${
            room.capacity -
            room.occupiedBeds
          })`,
          value: String(room.id),
        }))
      );
    };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await transferHostel({
        studentId: Number(
          form.studentId
        ),
        newRoomId: Number(
          form.newRoomId
        ),
        reason: form.reason,
      });

      alert(
        "Transferred Successfully"
      );

      setForm({
        studentId: "",
        hostelId: "",
        floorId: "",
        newRoomId: "",
        reason: "",
      });

      setCurrentAllocation(null);
      setFloors([]);
      setRooms([]);

    } catch (err: any) {
      alert(
        err?.message ||
          "Transfer Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow border p-8">
        <h1 className="text-2xl font-bold mb-6">
          Transfer Hostel
        </h1>

        <Form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <Label>Select Student</Label>
            <Select
              options={students}
              placeholder="Choose Student"
              defaultValue={form.studentId}
              onChange={
                handleStudentChange
              }
            />
          </div>

          {currentAllocation && (
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-300">
              <p className="font-semibold text-blue-700">
                Current Allocation
              </p>

              <p>
                Hostel:{" "}
                {
                  currentAllocation
                    .hostel?.name
                }
              </p>

              <p>
                Floor:{" "}
                {
                  currentAllocation
                    .floor?.name
                }
              </p>

              <p>
                Room:{" "}
                {
                  currentAllocation
                    .room
                    ?.roomNumber
                }
              </p>
            </div>
          )}

          <div>
            <Label>New Hostel</Label>
            <Select
              options={hostels}
              placeholder="Choose Hostel"
              defaultValue={form.hostelId}
              onChange={
                handleHostelChange
              }
            />
          </div>

          <div>
            <Label>New Floor</Label>
            <Select
              options={floors}
              placeholder="Choose Floor"
              defaultValue={form.floorId}
              onChange={
                handleFloorChange
              }
            />
          </div>

          <div>
            <Label>New Room</Label>
            <Select
              options={rooms}
              placeholder="Choose Room"
              defaultValue={form.newRoomId}
              onChange={(value) =>
                setForm((prev) => ({
                  ...prev,
                  newRoomId: value,
                }))
              }
            />
          </div>

          <div>
            <Label>Reason</Label>
            <TextArea
              placeholder="Transfer Reason"
              value={form.reason}
              onChange={(value) =>
                setForm((prev) => ({
                  ...prev,
                  reason: value,
                }))
              }
            />
          </div>

          <button
            type="submit"
            disabled={
              loading ||
              !currentAllocation
            }
            className="w-full h-11 rounded-lg bg-yellow-600 text-white disabled:opacity-50"
          >
            {loading
              ? "Transferring..."
              : "Transfer Hostel"}
          </button>
        </Form>
      </div>
    </div>
  );
}