import { FormControl, FormLabel, ButtonGroup, Button } from "@chakra-ui/react";

interface SegmentedControlProps {
  controlLabel: string;
  labels: string[];
  activeIndex: number;
  onChange: (i: number) => void;
}

const SegmentedControl = ({
  controlLabel,
  labels,
  activeIndex,
  onChange,
}: SegmentedControlProps) => (
  <FormControl>
    <FormLabel>{controlLabel}</FormLabel>
    <ButtonGroup isAttached variant="outline" display="flex">
      {labels.map((text, i) => (
        <Button
          isActive={activeIndex === i}
          flexBasis="100%"
          onClick={() => onChange(i)}
          key={`seg-${text}-${i}`}
        >
          {text}
        </Button>
      ))}
    </ButtonGroup>
  </FormControl>
);

export default SegmentedControl;
