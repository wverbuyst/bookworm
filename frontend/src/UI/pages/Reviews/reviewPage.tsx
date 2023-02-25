import {
  Box,
  Button,
  Container,
  Heading,
  useId,
  VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { calculateDays } from "../../../business/functions/date";
import { ControlledDatePicker } from "../../components/Controllers/DatePicker";
import { ControlledNumberInput } from "../../components/Controllers/NumberInput";
// import { useActions } from "../../../business/overmind";
import { ControlledTextInput } from "../../components/Controllers/TextInput";
import { FormFields, defaultValues, validationSchema } from "./helpers";

export default function ReviewPage() {
  const id = useId();
  // const { postReview } = useActions();
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm<FormFields>({
    defaultValues,
    resolver: zodResolver(validationSchema),
  });

  const [startDate, endDate] = watch(["startDate", "endDate"]);

  const numberOfDaysCalculated =
    startDate && endDate && calculateDays(endDate, startDate);

  useEffect(() => {
    if (startDate && endDate) {
      setValue("duration", numberOfDaysCalculated);
    }
  }, [setValue, startDate, endDate]);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    // await postReview(data);
    console.log(data);
    reset();
  };

  return (
    <Container centerContent>
      <Box>
        <Heading as="h1" size="lg">
          Review
        </Heading>
      </Box>

      <Box as="form" id={id} onSubmit={handleSubmit(onSubmit)}>
        <VStack m={4}>
          <ControlledTextInput
            name="bookTitle"
            control={control}
            label="book title"
            error={errors.bookTitle}
          />
          <ControlledTextInput
            name="author"
            control={control}
            label="author"
            error={errors.author}
          />
          <ControlledDatePicker
            name="startDate"
            control={control}
            label="startdate"
            error={errors.startDate}
          />
          <ControlledDatePicker
            name="endDate"
            control={control}
            label="enddate"
            error={errors.endDate}
          />
          <ControlledNumberInput
            name="duration"
            control={control}
            label="duration"
            error={errors.duration}
          />
          <Button type="submit" colorScheme="teal" size="sm">
            Submit
          </Button>
        </VStack>
      </Box>

      <Box>
        {/*    <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              overflow: "hidden",
              margin: "auto",
            }}
          >
            <Box sx={{ marginTop: 3, width: 400 }}>
              <Controller
                name="author"
                control={control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...field}
                    id="authorInput"
                    label="author"
                    type="text"
                    fullWidth
                  />
                )}
              />
              <Typography color="red" sx={{ mt: 1, textAlign: "center" }}>
                {errors.author && "This field is required!"}
              </Typography>
            </Box>
            <Box sx={{ marginTop: 3, width: 400 }}>
              <Controller
                name="bookTitle"
                control={control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...field}
                    id="bookTitleInput"
                    label="book title"
                    type="text"
                    fullWidth
                  />
                )}
              />
              <Typography color="red" sx={{ mt: 1, textAlign: "center" }}>
                {errors.bookTitle && "This field is required!"}
              </Typography>
            </Box>
            <Box sx={{ marginTop: 3, width: 400 }}>
              <Controller
                name="review"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...field}
                    id="reviewInput"
                    label="review"
                    type="text"
                    fullWidth
                    multiline
                    rows={4}
                  />
                )}
              />
            </Box>
            <Box sx={{ marginTop: 3, width: 400 }}>
              <Controller
                name="rating"
                control={control}
                defaultValue={1}
                render={({ field }) => (
                  <>
                    <Typography component="legend">Rating</Typography>
                    <Rating
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      {...field}
                      id="ratingInput"
                      name="rating"
                      onChange={(e) =>
                        field.onChange(
                          Number((e.target as HTMLInputElement).value)
                        )
                      }
                    />
                  </>
                )}
              />
            </Box>
            <Box sx={{ marginTop: 3 }}>
              <Button type="submit" variant="contained">
                ADD REVIEW
              </Button>
            </Box>
          </Box>
        </form> */}
      </Box>
    </Container>
  );
}
