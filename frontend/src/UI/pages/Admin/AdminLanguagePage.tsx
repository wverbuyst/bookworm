import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useId, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import {
  stateSectionsWithTable,
  useActions,
  useAppState,
} from "../../../business/overmind";
import { ControlledTextInput } from "../../components/Controllers";
import { SimpleSidebar } from "../../components/Navigation";
import { Search, TableOverview } from "../../components/Table";
import { PageTitle } from "../../components/Text";
import {
  defaultValuesLanguages,
  FormFieldsLanguages,
  validationSchemaLanguages,
} from "./helpers";

function Form({
  id,
  onCancel,
  onClose,
}: {
  id: string;
  onCancel: () => void;
  onClose: () => void;
}) {
  const languages = useAppState().language.overview || [];
  const { updateLanguage } = useActions().language;
  const nameOfLanguage =
    languages.find((l) => l.id === id)?.["name of language"] || "";
  const [language, setLanguage] = useState(nameOfLanguage);

  const submit = () => {
    updateLanguage({ id, nameOfLanguage: language });
    onClose();
  };

  return (
    <Stack spacing={4}>
      <FormControl>
        <FormLabel htmlFor="language">Language</FormLabel>
        <Input
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        />
      </FormControl>
      <ButtonGroup display="flex" justifyContent="flex-end">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={submit}>Save</Button>
      </ButtonGroup>
    </Stack>
  );
}

function EditButton({ id }: { id: string }) {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Popover
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      closeOnBlur={false}
      placement="left"
    >
      <PopoverTrigger>
        <IconButton
          data-tooltip-id="bookworm-tooltip"
          data-tooltip-content="Edit details"
          aria-label="Edit details"
          icon={<EditIcon />}
          mx={1}
          variant="unstyled"
        />
      </PopoverTrigger>
      <PopoverContent p={5}>
        <PopoverArrow />
        <PopoverCloseButton />
        <Form onCancel={onClose} id={id} onClose={onClose} />
      </PopoverContent>
    </Popover>
  );
}

function DeleteButton({ id }: { id: string }) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { deleteLanguage } = useActions().language;
  const languages = useAppState().language.overview || [];
  const nameOfLanguage = languages.find((l) => l.id === id)?.[
    "name of language"
  ];

  return (
    <Popover
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      placement="left"
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <IconButton
          data-tooltip-id="bookworm-tooltip"
          data-tooltip-content="Delete language"
          aria-label="Delete language"
          icon={<DeleteIcon />}
          mx={1}
          variant="unstyled"
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader
          display="flex"
          justifyContent="space-between"
          fontWeight="semibold"
        >
          Confirmation
        </PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody display="flex" justifyContent="flex-start">
          {`Are you sure you want to delete ${nameOfLanguage}?`}
        </PopoverBody>
        <PopoverFooter display="flex" justifyContent="flex-end">
          <ButtonGroup size="sm">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={() => deleteLanguage({ id })} colorScheme="pink">
              Apply
            </Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}

export function AdminLanguagePage() {
  const id = useId();
  const [showForm, setShowForm] = useState(false);
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormFieldsLanguages>({
    defaultValues: defaultValuesLanguages,
    resolver: zodResolver(validationSchemaLanguages),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "languages",
  });

  const {
    overview,
    ui: {
      table: { noDataMessage },
    },
  } = useAppState().language;
  const { postLanguages } = useActions().language;

  const onSubmit: SubmitHandler<FormFieldsLanguages> = async (data) => {
    await postLanguages(data);
    reset();
    setShowForm(false);
  };

  return (
    <SimpleSidebar>
      <PageTitle title="Language" />
      {overview ? (
        <Box style={{ backgroundColor: "#fff" }} p={5}>
          <Flex direction="column">
            <Search state={stateSectionsWithTable.language} />
            <TableOverview
              state={stateSectionsWithTable.language}
              actionButtons={[EditButton, DeleteButton]}
            />
          </Flex>
          <Flex mt={10}>
            {showForm ? (
              <Box as="form" id={id} onSubmit={handleSubmit(onSubmit)} mt={5}>
                <Text fontSize="2xl">Add language(s)</Text>
                {fields.map((item, index) => (
                  <HStack key={item.id} alignItems="flex-end" mt={5}>
                    <ControlledTextInput
                      name={`languages.${index}.nameOfLanguage`}
                      control={control}
                      label="name of language"
                      error={(errors.languages || [])[index]?.nameOfLanguage}
                      required
                    />
                    {index > 0 && (
                      <Button
                        type="button"
                        onClick={() => remove(index)}
                        colorScheme="pink"
                      >
                        Delete
                      </Button>
                    )}
                  </HStack>
                ))}
                <HStack mt={10}>
                  <Button
                    colorScheme="teal"
                    aria-label="Add new"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" colorScheme="teal">
                    Submit
                  </Button>
                  <IconButton
                    colorScheme="telegram"
                    aria-label="Add new"
                    icon={<AddIcon />}
                    onClick={() => append({ nameOfLanguage: "" })}
                  />
                </HStack>
              </Box>
            ) : (
              <Button
                mt={5}
                colorScheme="teal"
                aria-label="Add new"
                onClick={() => setShowForm(true)}
              >
                Add Language
              </Button>
            )}
          </Flex>
        </Box>
      ) : (
        <p>{noDataMessage}</p>
      )}
    </SimpleSidebar>
  );
}
