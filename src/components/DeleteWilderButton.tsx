import { ChangeEvent, FormEvent, useState } from "react";
import { useWilders } from "../contexts/WildersContext";
import { gql, useMutation } from "@apollo/client";

const DELETE_WILDER = gql`
  mutation DeleteWilder($deleteWilderId: Float!) {
    deleteWilder(id: $deleteWilderId) {
      name
    }
  }
`;

interface DeleteButtonProps {
  id: number;
  onSuccess: () => void;
}

export default function DeleteWilderButton({
  id,
  onSuccess,
}: DeleteButtonProps) {
  const [deleteWilder, { loading }] = useMutation(DELETE_WILDER);
  const [error, setError] = useState<Error | string>("");

  const handleDelete = async () => {
    try {
      await deleteWilder({
        variables: { deleteWilder: id },
      });
      onSuccess();
    } catch (error: any) {
      setError(error.toString());
    }
  };
  return (
    <div>
      <button onClick={handleDelete} disabled={loading}>
        Delete Wilder
      </button>
      {error && (
        <p style={{ color: "red" }}>
          {typeof error === "string" ? error : error.message}
        </p>
      )}
    </div>
  );
}
