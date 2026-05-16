"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  FieldError,
  Input,
  Label,
  ListBox,
  Modal,
  Surface,
  TextArea,
  TextField,
  Select,
} from "@heroui/react";
import { BiEdit } from "react-icons/bi";

export function EditModal({ destination }) {
  const {
    _id,
    imageUrl,
    price,
    destinationName,
    duration,
    country,
    description,
    category,
    departureDate,
  } = destination;

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedDestination = Object.fromEntries(formData.entries());

    const {data:tokenData} = await authClient.token()

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destination/${_id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${tokenData?.token}`
        },
        body: JSON.stringify(updatedDestination),
      });

      const data = await res.json();
      console.log("Update Result:", data);
      
      if (data.modifiedCount > 0) {
        alert("Destination updated successfully!");
      }
    } catch (error) {
      console.error("Error updating destination:", error);
    }
  };

  return (
    <Modal>
      <Button variant="outline" className="rounded-none">
        <BiEdit /> Edit
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-xl">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Edit Destination</Modal.Heading>
            </Modal.Header>
            <Modal.Body className="p-0"> 
              <Surface variant="default">
                <form onSubmit={onSubmit}>
                  <div className="p-10 space-y-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Destination Name */}
                    <div className="md:col-span-2">
                      <TextField defaultValue={destinationName} name="destinationName" isRequired>
                        <Label>Destination Name</Label>
                        <Input placeholder="Bali Paradise" className="rounded-2xl" />
                        <FieldError />
                      </TextField>
                    </div>

                    {/* Country */}
                    <TextField defaultValue={country} name="country" isRequired>
                      <Label>Country</Label>
                      <Input placeholder="Indonesia" className="rounded-2xl" />
                      <FieldError />
                    </TextField>

                    {/* Category */}
                    <div>
                      <Select defaultValue={category} name="category" isRequired className="w-full">
                        <Label>Category</Label>
                        <Select.Trigger className="rounded-2xl">
                          <Select.Value />
                          <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                          <ListBox>
                            {["Beach", "Mountain", "City", "Adventure", "Cultural", "Luxury"].map((cat) => (
                              <ListBox.Item key={cat} id={cat} textValue={cat}>
                                {cat}
                                <ListBox.ItemIndicator />
                              </ListBox.Item>
                            ))}
                          </ListBox>
                        </Select.Popover>
                      </Select>
                    </div>

                    {/* Price */}
                    <TextField defaultValue={price} name="price" type="number" isRequired>
                      <Label>Price (USD)</Label>
                      <Input type="number" className="rounded-2xl" />
                      <FieldError />
                    </TextField>

                    {/* Duration */}
                    <TextField defaultValue={duration} name="duration" isRequired>
                      <Label>Duration</Label>
                      <Input className="rounded-2xl" />
                      <FieldError />
                    </TextField>

                    {/* Departure Date */}
                    <div className="md:col-span-2">
                      <TextField defaultValue={departureDate} name="departureDate" type="date" isRequired>
                        <Label>Departure Date</Label>
                        <Input type="date" className="rounded-2xl" />
                        <FieldError />
                      </TextField>
                    </div>

                    {/* Image URL */}
                    <div className="md:col-span-2">
                      <TextField defaultValue={imageUrl} name="imageUrl" isRequired>
                        <Label>Image URL</Label>
                        <Input type="url" className="rounded-2xl" />
                        <FieldError />
                      </TextField>
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                      <TextField defaultValue={description} name="description" isRequired>
                        <Label>Description</Label>
                        <TextArea className="rounded-3xl" />
                        <FieldError />
                      </TextField>
                    </div>
                  </div>

                  {/* Modal Footer  */}
                  <Modal.Footer className="px-10 pb-10">
                    <Button type="submit" slot="close" className="w-full md:w-auto">
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}