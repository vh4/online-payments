"use client";

import { useState } from "react";
import { UserOutlined } from "@ant-design/icons"; // Correct import from Ant Design
import { AiOutlineHome, AiOutlineAppstore } from "react-icons/ai";
import { Button } from "rsuite";

export default function Navbar() {
  return (
    <div>
      <div className="">
        <nav
          style={{
            // backgroundColor: "#0f172a",
            // color: "#ffff",
          }}
          className="text-gray-700 px-2 sm:px-4 py-5 block sticky top-0 w-full z-50 left-0 border-b"
        >
          <div className="container mx-auto">
            <div
              className={`flex justify-between items-center -mx-2 md:-mx-10 lg:-mx-0 -px-0 md:px-8 xl:px-24 no-underline`}
            >
              <div className="">
                {/* <Link to="/" className="flex items-center cursor-pointer no-underline"> */}
                <div
                  style={
                    {
                      //   color: custom ? '#0f172a' : customLayout?.color?.primary?.font_color || '#ffff',
                    }
                  }
                  className="judul ml-4 text-xl xl:text-2xl font-extrabold no-underline cursor-pointer"
                >
                  {/* {customLayout?.header?.logo ?? ''} */}
                </div>
                {/* </Link> */}
              </div>
              <div className="flex space-x-6 items-center xl:order-2">
                <div
                  style={
                    {
                      // color: custom ? '#0f172a' : customLayout?.color?.primary?.font_color || '#ffff',
                    }
                  }
                  className="hidden md:flex space-x-4 items-center"
                >
                  <div
                    className="flex space-x-2 items-center cursor-pointer hover:text-blue-500"
                    // onClick={handleOpen}
                  >
                    <UserOutlined size={22} />
                    <div>Masuk</div>
                  </div>
                  <a
                    href="https://www.rajabiller.com/register"
                    style={{
                      // color: custom ? '#0f172a' : customLayout?.color?.primary?.font_color || '#ffff',
                      fontSize: "15px",
                    }}
                  >
                    <button
                      className="border border-gray-400 text-sm w-32 px-2 py-1 rounded-md hover:border-blue-500 hover:text-blue-500"
                      key="submit"
                      style={
                        {
                          // color: custom ? '#0f172a' : customLayout?.color?.primary?.font_color || '#ffff',
                        }
                      }
                    >
                      Registrasi
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* <Modal
          title="Login User"
          visible={showModal}
          onOk={handleClose}
          onCancel={handleClose}
          footer={[
            <Button
              key="submit"
              type="primary"
              className="bg-blue-500"
              loading={isLoading}
              onClick={handlerLogin}
            >
              Submit
            </Button>,
            <Button key="cancel" onClick={handleClose}>
              Cancel
            </Button>,
          ]}
        >
          <p>Masukkan Username & Password untuk Login</p>
          <Form
            labelCol={{
              span: 5,
            }}
            textAlign="left"
            wrapperCol={{
              span: 18,
            }}
            style={{
              maxWidth: 1000,
            }}
            className="mt-8"
            form={form}
            onFinish={handlerLogin}
          >
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Username harus diisi.",
                },
                {
                  max: 15,
                  message: "Username maksimal 15 karakter.",
                },
                {
                  pattern: /^[a-zA-Z0-9]*$/,
                  message: "Username hanya boleh berisi huruf dan angka.",
                },
              ]}
              className="mt-4"
              label="Username"
              name="uid"
            >
              <Input
                onChange={(e) => {
                  const value = e.target.value;
                  setuid(value);
                }}
                value={uid}
              />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Password harus diisi.",
                },
                {
                  max: 15,
                  message: "Password maksimal 15 karakter.",
                },
              ]}
              label="Password"
              name="pin"
            >
              <Input.Password
                onChange={(e) => setpin(e.target.value)}
                value={pin} // Pastikan value sesuai dengan nilai state pin
                required
              />
            </Form.Item>
            <Form.Item
              label="Recaptcha"
              name="recaptcha"
              rules={[
                {
                  required: true,
                  message: "Recaptcha harus diisi.",
                },
              ]}
            >
              <ReCAPTCHA
                ref={captchaRef} // Tambahkan ref ke reCAPTCHA
                onChange={onChange}
                sitekey="6LdGRpEoAAAAAOqcTSI_5GvfV0_FwqiyOAarv9KM"
              />
            </Form.Item>
          </Form>
        </Modal> */}
        </nav>
      </div>
    </div>
  );
}
