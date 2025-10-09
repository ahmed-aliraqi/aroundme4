<?php

namespace App\Exceptions\Auth;

use Exception;

class InvalidDataException extends Exception
{
    protected array $data = [];

    protected array $errors;

    public function setData(array $data): self
    {
        $this->data = $data;

        return $this;
    }

    public function getData(): array
    {
        return $this->data;
    }

    public function setErrorMessages(array $messages): self
    {
        $this->errors = $messages;

        return $this;
    }

    public function getErrors(): array
    {
        return $this->errors;
    }
}
