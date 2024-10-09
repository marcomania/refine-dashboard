"use client";

import {
  CATEGORIES_SELECT_QUERY,
  POST_EDIT_MUTATION,
} from "@queries/blog-posts";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

export default function BlogPostEdit() {
  const { formProps, saveButtonProps, queryResult } = useForm({
    meta: {
      gqlMutation: POST_EDIT_MUTATION,
    },
  });

  const blogPostsData = queryResult?.data?.data;

  const { selectProps: categorySelectProps } = useSelect({
    resource: "categories",
    defaultValue: blogPostsData?.category?.id,
    meta: {
      gqlQuery: CATEGORIES_SELECT_QUERY,
    },
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={"Title"}
          name={["title"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Content"}
          name="content"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.TextArea rows={5} />
        </Form.Item>
        <Form.Item
          label={"Category"}
          name={"categoryId"}
          initialValue={formProps?.initialValues?.category?.id}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...categorySelectProps} />
        </Form.Item>
        <Form.Item
          label={"Status"}
          name={["status"]}
          initialValue={"DRAFT"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            defaultValue={"DRAFT"}
            options={[
              { value: "DRAFT", label: "Draft" },
              { value: "PUBLISHED", label: "Published" },
              { value: "REJECTED", label: "Rejected" },
            ]}
            style={{ width: 120 }}
          />
        </Form.Item>
      </Form>
    </Edit>
  );
}
