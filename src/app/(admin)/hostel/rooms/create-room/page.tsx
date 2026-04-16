"use client";

import { useEffect, useState } from "react";

import {
  createRoom,
  getHostels,
  getFloorsByHostel,
} from "@/services/hostelService";

import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import Form from "@/components/form/Form";

export default function CreateRoomPage() {
  const [loading, setLoading] =
    useState(false);

  const [hostels, setHostels] =
    useState<any[]>([]);

  const [floors, setFloors] =
    useState<any[]>([]);

  const [form, setForm] = useState({
    hostelId: "",
    floorId: "",
    roomNumber: "",
    capacity: "",
  });

  useEffect(() => {
    fetchHostels();
  }, []);

  const fetchHostels = async () => {
    const res = await getHostels();

    setHostels(
      res.data.map((hostel: any) => ({
        label: hostel.name,
        value: String(hostel.id),
      }))
    );
  };

  const handleHostelChange = async (
    value: string
  ) => {
    setForm({
      ...form,
      hostelId: value,
      floorId: "",
    });

    const res =
      await getFloorsByHostel(
        Number(value)
      );

      console.log(res);
    setFloors(
      res.data.map((floor: any) => ({
        label: floor.name,
        value: String(floor.id),
      }))
    );
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await createRoom({
        ...form,
        hostelId: Number(form.hostelId),
        floorId: Number(form.floorId),
        capacity: Number(form.capacity),
      });

      alert("Room Created");

      setForm({
        hostelId: "",
        floorId: "",
        roomNumber: "",
        capacity: "",
      });

      setFloors([]);

    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg border p-8">
        <h1 className="text-2xl font-bold mb-6">
          Create Room
        </h1>

        <Form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <Label>Select Hostel</Label>

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
            <Label>Select Floor</Label>

            <Select
              options={floors}
              placeholder="Choose Floor"
              defaultValue={form.floorId}
              onChange={(value) =>
                setForm({
                  ...form,
                  floorId: value,
                })
              }
            />
          </div>

          <div>
            <Label>Room Number</Label>

            <Input
              placeholder="Enter Room Number"
              value={form.roomNumber}
              onChange={(e) =>
                setForm({
                  ...form,
                  roomNumber:
                    e.target.value,
                })
              }
            />
          </div>

          <div>
            <Label>Capacity</Label>

            <Input
              type="number"
              placeholder="Enter Capacity"
              value={form.capacity}
              onChange={(e) =>
                setForm({
                  ...form,
                  capacity:
                    e.target.value,
                })
              }
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-lg bg-brand-600 text-white"
          >
            {loading
              ? "Creating..."
              : "Create Room"}
          </button>
        </Form>
      </div>
    </div>
  );
}