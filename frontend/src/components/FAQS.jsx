import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import RemoveCircleOutline from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import BestSellingProducts from "./home/BestSellingProducts";
import Footer from "./Footer";

const items = [
  {
    key: "1",
    label: "What shipping methods are available ?",
    children: (
      <p style={{ paddingInlineStart: 24 }}>
        Marwues rhues edites sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
        suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan
        lacus vel facilisis.
      </p>
    ),
  },
  {
    key: "2",
    label: "How do I track my order ?",
    children: (
      <p style={{ paddingInlineStart: 24 }}>
        Marwues rhues edites sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
        suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan
        lacus vel facilisis.
      </p>
    ),
  },
  {
    key: "3",
    label: "How can I be sure of the product quality?",
    children: (
      <p style={{ paddingInlineStart: 24 }}>
        Marwues rhues edites sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
        suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan
        lacus vel facilisis.
      </p>
    ),
  },
  ,
  {
    key: "4",
    label: "How will I know if order is placed successfully?",
    children: (
      <p style={{ paddingInlineStart: 24 }}>
        Marwues rhues edites sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
        suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan
        lacus vel facilisis.
      </p>
    ),
  },
  ,
  {
    key: "5",
    label: "Can I cancel my order?",
    children: (
      <p style={{ paddingInlineStart: 24 }}>
        Marwues rhues edites sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
        suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan
        lacus vel facilisis.
      </p>
    ),
  },
];

const FAQS = () => {
  const [expanded, setExpanded] = useState("1");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <section className="w-full mt-24 bg-white font-[Poppins]">
        <div className="w-[90%] lg:w-[80%] mx-auto">
          <section className="relative bg-white min-h-72 rounded-2xl place-order-bg">
            <div className="bg-white w-fit pe-8 pt-3 rounded-tr-2xl absolute left-0 bottom-0">
              <h1 className="font-[BelfastGrotesk] text-3xl">FAQs</h1>
              <p className="text-xs mt-2">Home &gt; FAQs</p>
            </div>
          </section>

          <div className="w-full !h-full overflow-y-auto my-20">
            {items.map((item) => (
              <Accordion
                key={item.key}
                expanded={expanded === item.key}
                onChange={handleChange(item.key)}
                disableGutters
                elevation={0}
                sx={{
                  "&:before": { display: "none" },
                  borderBottom: "1px solid black",
                  paddingBlock: 2,
                }}
              >
                <AccordionSummary
                  expandIcon={
                    expanded === item.key ? (
                      <RemoveCircleOutline className="text-[#018D43]" />
                    ) : (
                      <AddCircleOutline className="text-[#018D43]" />
                    )
                  }
                  sx={{
                    flexDirection: "row-reverse",
                    "& .MuiAccordionSummary-content": {
                      marginY: "12px",
                      marginLeft: 5,
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontSize: "18px",
                      color: expanded === item.key ? "#018D43" : "inherit",
                      fontFamily:
                        expanded === item.key ? "BelfastGrotesk" : "Poppins",
                      lineHeight: "24px",
                      height: "24px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {item.label}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                  className="!font-[Poppins]"
                    sx={{
                      color: "gray",
                      fontSize: 14,
                      paddingInline: 5,
                    }}
                  >
                    {
                      item.children
                    }
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </div>
      </section>
      <BestSellingProducts/>
      <Footer/>
    </>
  );
};

export default FAQS;
